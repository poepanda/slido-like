/* -------------- SAMPLE DATA 
{
  eventId: id_of_the_event,
  eventCode: the_event_code,
  name: name_of_event,
  from: the_start_date,
  to: the_end_date,
  totalHighlight: 0,
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
    }
  ]
}
-----------------------------*/
import {
  CREATE_EVENT_START,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  EDIT_QUESTION_START,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAIL,
  DELETE_QUESTION_START,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
  SET_HIGHLIGHT_QUESTION,
  CLEAN_ERROR,
  ADMIN_FETCH_EVENT_START,
  ADMIN_FETCH_EVENT_SUCCESS,
  ADMIN_FETCH_EVENT_FAIL,
} from './actionTypes';

import { addIndexPropertyTo } from 'app/services/transform';
import sampleQuestions from './sampleQuestions';

const initialState = {
  eventId: '',
  eventCode: '',
  name: '',
  from: '',
  to: '',
  totalHighlight: 0,
  inProgress: false,
  errors: null,
  questions: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ADMIN_FETCH_EVENT_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ADMIN_FETCH_EVENT_SUCCESS: {
      action.data.questions = addIndexPropertyTo(action.data.questions);
      return {
        ...state,
        ...action.data,
        inProgress: false,
      }
    }
    case ADMIN_FETCH_EVENT_FAIL: {
      return {
        ...state,
        errors: action.errors,
        inProgress: false,
      }
    }
    case CREATE_EVENT_START: {
      return {
        ...state,
        inProgress: true
      }
    }
    case CREATE_EVENT_SUCCESS: {
      const { id, eventCode, name, from, to } = action;
      return { 
        ...state,
        inProgress: false,
        eventCode,
        eventId: id,
        name,
        from,
        to,

        // Reset the metat data
        totalHighlight: 0,
        errors: null,
        questions: sampleQuestions,
      }
    }
    case CREATE_EVENT_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
      }
    }
    case EDIT_QUESTION_START:
    case DELETE_QUESTION_START: {
      const newQuestions = [...state.questions];
      newQuestions[action.index].inProgress = true;
      return {
        ...state,
        questions: newQuestions,
      }
    }
    case EDIT_QUESTION_SUCCESS: {
      const newQuestions = [...state.questions];
      newQuestions[action.index].content = action.newContent;
      newQuestions[action.index].errors = null;
      return {
        ...state,
        questions: newQuestions,
      }
    }
    case DELETE_QUESTION_SUCCESS: {
      const newQuestions = [...state.questions];
      newQuestions.splice(action.index, 1);
      return {
        ...state,
        questions: newQuestions,
      }
    }
    case EDIT_QUESTION_FAIL: 
    case DELETE_QUESTION_FAIL: {
      const newQuestions = [...state.questions];
      newQuestions[action.index].errors = action.errors;
      return {
        ...state,
        questions: newQuestions,
      }
    }
    case SET_HIGHLIGHT_QUESTION: {
      const { index } = action;
      const newQuestions = [...state.questions]
      const isHighlight = newQuestions[index].highlighted;

      // WONDERING: do we really need to check this while the view layer already handle the alert?
      // Any case that is run out of covered scope?
      if (!isHighlight && state.totalHighlight === 3) return state;

      newQuestions[index].highlighted = !isHighlight;
      return {
        ...state,
        questions: newQuestions,
        totalHighlight: state.totalHighlight + ((isHighlight) ? -1 : 1),
      }
    }
    
    case CLEAN_ERROR: {
      return {
        ...state,
        errors: null,
      }
    }
    default: return state;
  }
};