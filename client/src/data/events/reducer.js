/* -------------------- SAMPLE DATA
events: {
  [event_code]: {
    eventId: id_of_the_event,
    code: the_event_code,
    name: name_of_event,
    from: the_start_date,
    to: the_end_date,
    inProgress: is_event_in_any_progress,
    errors: event_progress_errors,
    questions: [
      {
        id: id_of_question,
        content: content_of_question,
        likes: [ array_of_audience_token ],
        dislikes: [ array_of_audience_token ],
        highlight: is_this_question_highlighted,
        createdAt: this_question_is_created_at,
        createdBy: name_of_the_asker,
        errors: question_progress_errors,
        askerName: name_of_the_asker,
        askerRoomToken: room_token_of_that_asker,
      }
    ]
  }
}
----------------------------------*/

import moment from 'moment';
import {
  ADD_QUESTION_START,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAIL,
  FETCH_EVENT_START,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  REACT_TO_QUESTION_START,
  REACT_TO_QUESTION_SUCCESS,
  REACT_TO_QUESTION_FAIL,

} from './actionTypes';

import { addIndexPropertyTo } from 'app/services/transform';
import { setQuestionProp } from './setters';

const initialState = {
  events: {},
  inProgress: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_EVENT_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case FETCH_EVENT_SUCCESS: {
      const newEvents = {...state.events};
      const indexedQuestions = addIndexPropertyTo(action.data.questions);
      newEvents[action.code] = {
        ...action.data,
        questions: indexedQuestions
      };
      return {
        ...state,
        inProgress: false,
        events: newEvents,
      }
    }
    case FETCH_EVENT_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
      }
    }
    case ADD_QUESTION_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ADD_QUESTION_SUCCESS: {
      const { code, question } = action;
      const currentEvent = {...state.events[code]}
      const newQuestions = [...currentEvent.questions];
      newQuestions.push(
        {
          index: newQuestions.length,
          id: moment().unix() + Math.floor(Math.random() * 100),
          likes: [],
          dislikes: [],
          inProgress: false,
          errors: '',
          ...question,
        }
      );
      currentEvent.questions = newQuestions;

      return {
        ...state,
        events: {
          ...state.events,
          ...{ [code]: {...currentEvent} }
        },
        inProgress: false,
      }
    }
    case ADD_QUESTION_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
      }
    }

    case REACT_TO_QUESTION_START: {
      const { newData } = action;
      const newEvents = setQuestionProp(state, action, { ...newData, inProgress: true });
      return {
        ...state,
        events: newEvents
      };
    }
    case REACT_TO_QUESTION_FAIL: {
      const { oldData } = action;
      const newEvents = setQuestionProp(state, action, { ...oldData, errors: action.errors});
      return {
        ...state,
        events: newEvents
      };
    }
    case REACT_TO_QUESTION_SUCCESS: {
      return {
        ...state,
      };
    }
    default: return state;
  }
};