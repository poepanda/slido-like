import { connect } from 'react-redux';

import Manage from './Manage';

import { eventCreated, event } from '../data/selectors';
import { deleteQuestion, editQuestion, adminFetchEvent } from '../data/actionCreators';

const mapStateToProps = state => ({
  eventCreated: eventCreated(state),
  event: event(state),
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: ({ index, id }) => dispatch(deleteQuestion({ index, id })),
  editQuestion: ({ index, id, newContent }) => dispatch(editQuestion({ index, id, newContent})),
  fetchEvent: () => dispatch(adminFetchEvent()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Manage);