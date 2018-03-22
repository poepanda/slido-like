import { connect } from 'react-redux';

import Manage from './Manage';

import { eventCreated, event, inProgress, errors } from '../data/selectors';
import { deleteQuestion, editQuestion, adminFetchEvent } from '../data/actionCreators';

const mapStateToProps = state => ({
  eventCreated: eventCreated(state),
  event: event(state),
  inProgress: inProgress(state),
  errors: errors(state),
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