const localState = state => state.screens.AdminEvent;

export const inProgress = state => localState(state).inProgress;
export const errors = state => localState(state).errors;
export const eventCreated = state => !!localState(state).eventId;
export const event = state => {
  const { eventId, eventCode, name, from, to, totalHighlight, questions } = localState(state);
  return {
    eventId,
    eventCode,
    name,
    from,
    to,
    totalHighlight,
    questions,
  }
};

