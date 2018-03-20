import { connect } from 'react-redux';

import Register from './Register';

import { inProgress, errors } from 'app/data/me/selectors';
import { register } from 'app/data/me/actionCreators';

const mapStateToProps = state => ({
  inProgress: inProgress(state),
  errors: errors(state),
});

const mapDispatchToProps = dispatch => ({
  register: (email, password) => dispatch(register(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);