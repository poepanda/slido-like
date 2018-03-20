import { 
  ADMIN_FETCH_EVENT,
  CREATE_EVENT,
  DELETE_QUESTION,
  EDIT_QUESTION,
  SET_HIGHLIGHT_QUESTION,
  CLEAN_ERROR,
} from './actionTypes';

// NOTE: the id is used for server-side update while the index is used for local data update

export const createEvent = ({ name, from, to, eventCode }) => ({
  type: CREATE_EVENT,
  name,
  from: from.toISOString(),
  to: to.toISOString(),
  eventCode,
});

export const fetchEvent = () => ({
  type: ADMIN_FETCH_EVENT
})

export const editQuestion = ({ index, id, newContent }) => ({
  type: EDIT_QUESTION,
  index,
  id,
  newContent,
});

export const deleteQuestion = ({ index, id }) => ({
  type: DELETE_QUESTION,
  index,
  id,
});

export const setHighlightQuestion = ({ index, id }) => ({
  type: SET_HIGHLIGHT_QUESTION,
  index,
  id,
});

export const adminFetchEvent = () => ({
  type: ADMIN_FETCH_EVENT,
})

export const cleanErrors = () => ({
  type: CLEAN_ERROR,
});