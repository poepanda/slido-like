import { 
  FETCH_EVENT,
  ADD_QUESTION,
  REACT_TO_QUESTION,
} from './actionTypes';

export const fetchEvent = (code) => ({
  type: FETCH_EVENT,
  code,
});

export const addQuestion = (code, question) => ({
  type: ADD_QUESTION,
  code,
  question,
});

export const reactToQuestion = (payload) => ({
  type: REACT_TO_QUESTION,
  payload
})