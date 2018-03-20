import { combineReducers } from 'redux';

import meta from './meta/reducer';
import me from './me/reducer';
import events from './events/reducer';

export default combineReducers({
  meta,
  me,
  events,
})