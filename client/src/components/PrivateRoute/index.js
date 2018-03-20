import { connect } from 'react-redux';

import PrivateRoute from './PrivateRoute';

import { authenticated } from 'app/data/me/selectors';

const mapStateToProps = state => ({
  authenticated: authenticated(state)
});

export default connect(
  mapStateToProps,
)(PrivateRoute);