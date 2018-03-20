const localState = state => state.data.me;

export const authenticated = state => localState(state).authenticated;
export const inProgress = state => localState(state).inProgress;
export const errors = state => localState(state).errors;
export const roomToken = (state, eventCode) => localState(state).roomTokens[eventCode];