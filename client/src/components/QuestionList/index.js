import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import PropTypes from 'prop-types';

import SortableItem from './SortableItem';
import { getSortList } from 'app/services/sorting';

import './QuestionList.css';

const SortableList = SortableContainer(
  ({ 
    questions,
    activePopoverId,
    deleteQuestion,
    editQuestion,
    toggleQuestionPopover,
    isAdmin,
    reactToQuestion,
    interacterToken
  }) => (
    <ul className="admin-manage-event__question-list">
      {questions.map((item, index) => (
        <SortableItem
          key={`questions-${item.id}`}
          index={item.index}
          item={item}
          isAdmin={isAdmin}
          editQuestion={editQuestion}
          deleteQuestion={deleteQuestion}
          toggleQuestionPopover={toggleQuestionPopover}
          activePopoverId={activePopoverId}
          reactToQuestion={reactToQuestion}
          interacterToken={interacterToken}
          disabled
        />
      ))}
    </ul>
  )
);

export default class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePopoverId: null
    };

    this.toggleQuestionPopover = this.toggleQuestionPopover.bind(this);
  }

  toggleQuestionPopover(id) {
    this.setState({
      activePopoverId: this.state.activePopoverId !== id ? id : null
    });
  }

  render() {
    const {
      questions,
      deleteQuestion,
      editQuestion,
      isAdmin,
      sortBy,
      reactToQuestion,
      interacterToken
    } = this.props;
    return (questions && questions.length) ? (
      <SortableList
        questions={getSortList(questions, sortBy, isAdmin ? true : false)}
        deleteQuestion={deleteQuestion}
        editQuestion={editQuestion}
        isAdmin={isAdmin}
        toggleQuestionPopover={this.toggleQuestionPopover}
        activePopoverId={this.state.activePopoverId}
        reactToQuestion={reactToQuestion}
        interacterToken={interacterToken}
      />
    ) : (
      <div className="container">
        <h4>Ask something :)</h4>
      </div>
    );
  }
}

QuestionList.proptypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  deleteQuestion: PropTypes.func,
  editQuestion: PropTypes.func,
  isAdmin: PropTypes.bool,
  toggleQuestionPopover: PropTypes.func,
  activePopoverId: PropTypes.string,
  interacterToken: PropTypes.string,
  reactToQuestion: PropTypes.func,
}