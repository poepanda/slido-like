import { REHYDRATE_COMPLETE } from './actionTypes';

const INITIAL_STATE = {
  dataIsReady: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case REHYDRATE_COMPLETE: {
      return {
        ...state,
        dataIsReady: true
      }
    }
    default: return state;
  }
}
