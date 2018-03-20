import React, { Component } from 'react';

import QuestionList from 'app/components/QuestionList';
import Select from 'app/components/Select';
import Input from 'app/components/Input';
import Button from 'app/components/Button';
import { SORT_BY } from 'app/services/constants';

import './Room.css';

class EventRoom extends Component{
  constructor(props) {
    super(props);
    this.state = {
      sortBy: SORT_BY.recent,
      askerName: '',
      newQuestionContent: '',
    }
    this.setSortBy = this.setSortBy.bind(this);
    this.reactToQuestion = this.reactToQuestion.bind(this);
  }

  setSortBy(selectedItem) {
    this.setState({ sortBy: selectedItem.value });
  }

  setValue = name => value => {
    this.setState({ [name]: value });
  }

  addQuestion = (e) => {
    e.preventDefault();
    const { 
      roomToken,
      match: { params: { code }},
      addQuestion
    } = this.props;
    const { askerName, newQuestionContent } = this.state;
    const question = {
      askerRoomToken: roomToken,
      askerName: askerName ? askerName : 'Anonymous',
      content: newQuestionContent,
      
    }
    addQuestion(code, question);

    // Clean up input field after submitting new question 
    this.setState({ newQuestionContent: '' });
  }

  reactToQuestion({ index, id, isLike, likes, dislikes }) {
    const { reactToQuestion, match: { params: { code }}, roomToken } = this.props;
    reactToQuestion({ 
      index,
      id,
      isLike,
      eventCode: code,
      likes,
      dislikes,
      roomToken,
    });
  }

  componentDidMount() {
    const { 
      event,
      fetchEvent,
      roomToken,
      getRoomToken,
      match: {
        params: { code }
      } 
    } = this.props;
    if (!event) {
      fetchEvent(code);
    } else if (!roomToken) {
      getRoomToken(code);
    }
  }

  componentDidUpdate() {
    const { event, roomToken, getRoomToken, match: { params: { code } }} = this.props;
    if (event && !roomToken) { 
      getRoomToken(code)
    }
  }

  render() {
    const { event, roomToken } = this.props;
    const { questions = [], name } = event ? event : {};
    const { sortBy, newQuestionContent, askerName } = this.state;

    return (
      <div className="audience-event-room container">
        <h1 className="title has-text-centered">{`Welcome to ${name}`}</h1>
        <div className="columns">
          <div className="column is-full">
            <form className="new-question-form" onSubmit={this.addQuestion}>
              <Input
                customInputClass="new-question-form__input"
                value={newQuestionContent}
                placeholder="Type your question"
                onChange={this.setValue('newQuestionContent')}
              />
              <div className="columns">
                <div className="column">
                  <Input
                    value={askerName}
                    placeholder="You name (optional)"
                    onChange={this.setValue('askerName')}
                    addons={
                      <Button primary>Send</Button>
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            {questions.length} question{(questions.length > 1) ? 's' : ''}
          </div>
          <div className="column is-right">
            <Select
              options={[
                { value: SORT_BY.recent, label: SORT_BY.recent },
                { value: SORT_BY.popular, label: SORT_BY.popular },
              ]}
              onChange={this.setSortBy}
              value={sortBy}
            />
          </div>
        </div>
        <QuestionList
          sortBy={sortBy}
          interacterToken={roomToken}
          reactToQuestion={this.reactToQuestion}
          questions={questions}/>
      </div>
    );
  }
}

export default EventRoom;