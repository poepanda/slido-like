import { connect } from 'react-redux';

import Create from './Create';

import { inProgress, eventCreated } from '../data/selectors';
import { createEvent } from '../data/actionCreators';

const mapStateToProps = state => ({
  inProgress: inProgress(state),
  eventCreated: eventCreated(state), 
});

const mapDispatchToProps = dispatch => ({
  createEvent: (data) => dispatch(createEvent(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create);