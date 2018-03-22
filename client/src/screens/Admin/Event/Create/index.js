import { connect } from 'react-redux';

import Create from './Create';

import { inProgress, errors, eventCreated } from '../data/selectors';
import { createEvent, cleanError } from '../data/actionCreators';

const mapStateToProps = state => ({
  inProgress: inProgress(state),
  errors: errors(state),
  eventCreated: eventCreated(state), 
});

const mapDispatchToProps = dispatch => ({
  createEvent: (data) => dispatch(createEvent(data)),
  cleanError: () => dispatch(cleanError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create);