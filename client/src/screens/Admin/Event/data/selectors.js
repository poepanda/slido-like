const localState = state => state.screens.AdminEvent;

export const inProgress = state => localState(state).inProgress;
export const errors = state => localState(state).errors;
export const eventCreated = state => !!localState(state).id;
export const event = state => {
  const { eventId, code, name, from, to, totalHighlight, questions } = localState(state);
  return {
    eventId,
    code,
    name,
    from,
    to,
    totalHighlight,
    questions,
  }
};

