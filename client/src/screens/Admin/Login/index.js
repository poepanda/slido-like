import { connect } from 'react-redux';

import Login from './Login';

import { inProgress, errors } from 'app/data/me/selectors';
import { login } from 'app/data/me/actionCreators';

const mapStateToProps = state => ({
  inProgress: inProgress(state),
  errors: errors(state),
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);