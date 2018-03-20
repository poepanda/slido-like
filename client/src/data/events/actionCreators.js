import { 
  FETCH_EVENT,
  ADD_QUESTION,
  REACT_TO_QUESTION,
} from './actionTypes';

export const fetchEvent = (eventCode) => ({
  type: FETCH_EVENT,
  eventCode,
});

export const addQuestion = (eventCode, question) => ({
  type: ADD_QUESTION,
  eventCode,
  question,
});

export const reactToQuestion = (payload) => ({
  type: REACT_TO_QUESTION,
  payload
})