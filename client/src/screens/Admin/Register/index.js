import { connect } from 'react-redux';

import Register from './Register';

import { inProgress, errors } from 'app/data/me/selectors';
import { register, cleanError } from 'app/data/me/actionCreators';

const mapStateToProps = state => ({
  inProgress: inProgress(state),
  errors: errors(state),
});

const mapDispatchToProps = dispatch => ({
  register: ({ name, email, password }) => dispatch(register({ name, email, password })),
  cleanError: () => dispatch(cleanError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);