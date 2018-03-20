const localState = (state) => state.data.meta;

export const dataIsReady = state => localState(state).dataIsReady;