import React, { Component } from 'react'
import moment from 'moment';
import { SortableElement } from 'react-sortable-hoc';
import classnames from 'classnames';
import Popover from 'react-popover';
import MoreIcon from 'react-icons/lib/fa/ellipsis-v';
import BinIcon from 'react-icons/lib/fa/trash-o';
import EditIcon from 'react-icons/lib/fa/edit';
import LikeIcon from 'react-icons/lib/fa/thumbs-up';
import DislikeIcon from 'react-icons/lib/fa/thumbs-down';

import Input from 'app/components/Input';
import Button from 'app/components/Button';

class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      
    }

    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.showEditQuestionForm = this.showEditQuestionForm.bind(this);
    this.toggleQuestionPopover = this.toggleQuestionPopover.bind(this);
    this.setNewContent = this.setNewContent.bind(this);
    this.reactToQuestion = this.reactToQuestion.bind(this);
  }

  toggleQuestionPopover() {
    this.props.toggleQuestionPopover(this.props.item.id);
  }

  deleteQuestion(e) {
    const target = e.currentTarget;
    this.props.deleteQuestion({
      index: target.getAttribute('index'),
      id: target.getAttribute('id')
    });
  }
  
  showEditQuestionForm() {
    this.setState({
      editMode: true,
      editedContent: this.props.item.content
    });
    this.toggleQuestionPopover();
  }

  setNewContent(content) {
    this.setState({ editedContent: content });
  }

  editQuestion(e) {
    e.preventDefault();
    const { item: { id, index }, editQuestion } = this.props;
    editQuestion({ index, id, newContent: this.state.editedContent });
    this.setState({
      editedContent: '',
      editMode: false,
    })
  }

  reactToQuestion(e) {
    const { reactToQuestion, item: { index, id, likes, dislikes }} = this.props;
    const isLike = !!e.currentTarget.getAttribute('data-like');
    reactToQuestion({ index, id, isLike, likes, dislikes });
  }
  
  render() {
    const {
      activePopoverId,
      isAdmin,
      interacterToken,
      item: { id, content, createdAt, index, likes, dislikes, askerName }
    } = this.props;
    const { editMode, editedContent } = this.state;
    const likedByMe = likes.indexOf(interacterToken) > -1;
    const dislikedByMe = dislikes.indexOf(interacterToken) > -1;
    
    return (
      <li className="columns question-list">
        <div className="question-item column">
          <div className="question-item__header columns">
            <div className="question-item__avatar" />
            <div className="question-item__name-meta">
              <div>
                <b>{askerName ? askerName : 'Anonymous'}</b>
              </div>
              <div>
                <span>{`${likes.length} like${
                  likes.length > 1 ? 's' : ''
                } - `}</span>
                <span>{moment(createdAt).format('DD MMM YYYY - hh:mmA')}</span>
              </div>

              {/* ------- Popover section #AdminOnly------- */}
              { isAdmin ? (
                <Popover
                  isOpen={activePopoverId === id}
                  preferPlace="left"
                  tipSize={0.01}
                  body={
                    <div className="question-item__popover">
                      <div
                        className="question-item__icon-link"
                        index={index}
                        id={id}
                        onClick={this.showEditQuestionForm}
                      >
                        <BinIcon />
                        Edit
                      </div>
                      <div
                        className="question-item__icon-link"
                        index={index}
                        id={id}
                        onClick={this.deleteQuestion}
                      >
                        <EditIcon />
                        Delete
                      </div>
                    </div>
                  }
                >
                  <div
                    className="question-item__more"
                    id={id}
                    onClick={this.toggleQuestionPopover}
                  >
                    <MoreIcon size={30} color="#333333" />
                  </div>
                </Popover>
              ) : (
                <div className="react-buttons columns">
                  <div 
                    className={classnames(
                      'react-buttons__react is-like column is-vcentered',
                      { 'react-buttons__react--is-active': likedByMe}
                    )}
                    data-like
                    onClick={this.reactToQuestion}
                  >
                    <span>{likes.length}</span>
                    <LikeIcon />
                  </div>
                  <div 
                    className={classnames(
                      'react-buttons__react column is-vcentered',
                      { 'react-buttons__react--is-active': dislikedByMe }
                    )} 
                    onClick={this.reactToQuestion}
                  >
                    <span>{dislikes.length}</span>
                    <DislikeIcon />
                  </div>
                </div>
              ) }
            </div>
          </div>
          <div className="question-item__content columns ">
            { (isAdmin && editMode) ? (
              <form className="column is-full" onSubmit={this.editQuestion}>
                <Input
                  customClass="is-fullwidth"
                  onChange={this.setNewContent}
                  value={editedContent}
                  addons={(
                    <Button primary>
                      Save
                    </Button>
                  )}
                />
              </form>
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default SortableElement(QuestionItem);
