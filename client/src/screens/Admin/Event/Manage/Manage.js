import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import QuestionList from 'app/components/QuestionList';
import Select from 'app/components/Select';
import { SORT_BY } from 'app/services/constants';

import './Manage.css';

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: SORT_BY.recent,
    }
    this.setSortBy = this.setSortBy.bind(this);
  }

  setSortBy(selectedItem) {
    this.setState({ sortBy: selectedItem.value });
  }

  componentDidMount() {
    if (!this.props.eventCreated) this.props.fetchEvent();
  }

  render() {
    const { eventCreated, event: { questions }, editQuestion, deleteQuestion } = this.props;
    const { sortBy } = this.state;

    return (
      <div className="admin-manage-event">
        <div className="container">
          <h1 className="title has-text-centered">Manage events</h1>
          { !eventCreated ? (<Link to="/admin/event/create">Create Event</Link>) : '' }
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
            deleteQuestion={deleteQuestion}
            editQuestion={editQuestion}
            sortBy={this.state.sortBy}
            questions={questions}
            isAdmin/>
        </div>
      </div>
    )
  }
}

export default Manage;