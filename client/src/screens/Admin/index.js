import { connect } from 'react-redux';

import Admin from './Admin';

import { authenticated } from 'app/data/me/selectors';

const mapStateToProps = state => ({
  authenticated: authenticated(state),
});

export default connect(
  mapStateToProps,
)(Admin);