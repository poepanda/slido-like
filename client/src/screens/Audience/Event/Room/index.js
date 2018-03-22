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
  fetchEvent: code => dispatch(fetchEvent(code)),
  getRoomToken: code => dispatch(getRoomToken(code)),
  addQuestion: (code, question) => dispatch(addQuestion(code, question)),
  reactToQuestion: ({ 
    code,
    index,
    id,
    isLike,
    likes,
    dislikes,
    roomToken
  }) => dispatch(reactToQuestion({
    code,
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