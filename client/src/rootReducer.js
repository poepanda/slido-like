import { combineReducers } from 'redux';

import data from './data/reducer';
import screens from './screens/reducer';

export default combineReducers({
  data,
  screens,
})