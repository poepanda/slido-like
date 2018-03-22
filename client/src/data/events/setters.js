export const setQuestionProp = (state, action, newProps) => {
  const { code, index } = action;
  const targetEvent = state.events[code];
  const newQuestions = [...targetEvent.questions];
  newQuestions[index] = {
    ...newQuestions[index],
    ...newProps
  };

  return {
    ...state.events,
    ...{ 
      [code]: {
        ...targetEvent,
        questions: newQuestions,
      }
    }
  }
}