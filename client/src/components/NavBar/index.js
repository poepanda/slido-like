import { connect } from 'react-redux';

import NavBar from './NavBar';

import { authenticated } from 'app/data/me/selectors';
import { logout } from 'app/data/me/actionCreators';

const mapStateToProps = state => ({
  authenticated: authenticated(state)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);