import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import QuestionList from 'app/components/QuestionList';
import Loading from 'app/components/Loading';
import ErrorsDisplay from 'app/components/ErrorsDisplay';
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
    // if (!this.props.eventCreated) this.props.fetchEvent();
    this.props.fetchEvent();
  }

  render() {
    const { 
      eventCreated,
      inProgress,
      errors,
      event: { name, code, questions },
      editQuestion,
      deleteQuestion 
    } = this.props;
    console.log('event', this.props.event);
    const { sortBy } = this.state;

    return (
      <div className="admin-manage-event">
        <div className="container">
          <h1 className="title has-text-centered">Event manager</h1>
          <div className="columns is-centered has-text-centered">
            <ErrorsDisplay errors={errors}/>
          </div>
          { !eventCreated ? (
            <div className="has-text-centered">
              <Link to="/admin/event/create">Create Event</Link>
            </div>
          ) : (
            <div>
              <div>
                <div className="columns">
                  <div className="column has-text-right">
                    <h2 className="is-size-3">{ name }</h2>
                    <h3>code #{ code }</h3>
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
                  deleteQuestion={deleteQuestion}
                  editQuestion={editQuestion}
                  sortBy={this.state.sortBy}
                  questions={questions}
                  emptyText="Waiting for audience to ask something..."
                  isAdmin/>
              </div>
            </div>
          ) }
        </div>
        <Loading visible={inProgress} fullscreen/>
      </div>
    )
  }
}

export default Manage;