const localState = state => state.data.events;

export const event = (state, eventCode) => localState(state).events[eventCode];