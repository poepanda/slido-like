import { connect } from 'react-redux';

import Room from './Room';

import { event } from 'app/data/events/selectors';
import { roomToken } from 'app/data/me/selectors';
import { getRoomToken } from 'app/data/me/actionCreators';
import { fetchEvent, addQuestion, reactToQuestion } from 'app/data/events/actionCreators';

const mapStateToProps = (state, { match: { params: { code }}}) => {
  return {
    event: event(state, code),
    roomToken: roomToken(state, code)
  }
};

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventCode => dispatch(fetchEvent(eventCode)),
  getRoomToken: eventCode => dispatch(getRoomToken(eventCode)),
  addQuestion: (eventCode, question) => dispatch(addQuestion(eventCode, question)),
  reactToQuestion: ({ 
    eventCode,
    index,
    id,
    isLike,
    likes,
    dislikes,
    roomToken
  }) => dispatch(reactToQuestion({
    eventCode,
    index,
    id,
    isLike,
    likes,
    dislikes,
    roomToken
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);