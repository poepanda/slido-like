export const setQuestionProp = (state, action, newProps) => {
  const { eventCode, index } = action;
  const targetEvent = state.events[eventCode];
  const newQuestions = [...targetEvent.questions];
  newQuestions[index] = {
    ...newQuestions[index],
    ...newProps
  };

  return {
    ...state.events,
    ...{ 
      [eventCode]: {
        ...targetEvent,
        questions: newQuestions,
      }
    }
  }
}