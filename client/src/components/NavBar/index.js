import { connect } from 'react-redux';

import NavBar from './NavBar';

import { authenticated, errors as logoutErrors } from 'app/data/me/selectors';
import { logout, cleanError as cleanLogoutError } from 'app/data/me/actionCreators';

const mapStateToProps = state => ({
  authenticated: authenticated(state),
  logoutErrors: logoutErrors(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  cleanLogoutError: () => dispatch(cleanLogoutError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);