import { put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_EVENT,
  FETCH_EVENT_START,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  ADD_QUESTION,
  ADD_QUESTION_START,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAIL,
  REACT_TO_QUESTION,
  REACT_TO_QUESTION_START,
  REACT_TO_QUESTION_SUCCESS,
  REACT_TO_QUESTION_FAIL,
} from './actionTypes';

import sampleEvent from './sampleEvent';

function* fetchEvent({ eventCode }) {
  yield put({ type: FETCH_EVENT_START, eventCode });
  try {
    const data = sampleEvent;
    yield put({ type: FETCH_EVENT_SUCCESS, eventCode, data });
  } catch(err) {
    yield put({ type: FETCH_EVENT_FAIL });
  }
}

function* addQuestion({ eventCode, question }) {
  yield put({ type: ADD_QUESTION_START, eventCode });
  try {
    yield put({ type: ADD_QUESTION_SUCCESS, eventCode, question });
  } catch(err) {
    yield put({ type: ADD_QUESTION_FAIL });
  }
}

// To get the list of likes or dislikes tokens
// After execute the reaction
// TODO: Think of a better way to handle this!
const getReactList = ({ isLike, likes, dislikes, roomToken }) => {
  const newLikes = [...likes];
  const newDislikes = [...dislikes];
  const likedIndex = likes.indexOf(roomToken);
  const dislikedIndex = dislikes.indexOf(roomToken);
  if (isLike) {
    // User click on Like button
    if (likedIndex > -1) {
      newLikes.splice(likedIndex, 1)
    } else {
      newLikes.push(roomToken);
    }
    // Remove dislike if user already disliked 
    if (dislikedIndex > -1) newDislikes.splice(dislikedIndex, 1);
  } else {
    // User click on dislike button
    if (dislikedIndex > -1) {
      newDislikes.splice(dislikedIndex, 1);
    } else {
      newDislikes.push(roomToken);
    }
    // Remove like if user already liked 
    if (likedIndex > -1) newLikes.splice(dislikedIndex, 1);
  }
  return { 
    oldData: {
      likes: [...likes],
      dislikes: [...dislikes],
    },
    newData: {
      likes: newLikes,
      dislikes: newDislikes,
    }
  }
}

function* reactToQuestion({ payload }) {
  const {
    eventCode,
    index,
    id,
    isLike,
    likes,
    dislikes,
    roomToken 
  } = payload;
  
  const { oldData, newData } = getReactList({ isLike, likes, dislikes, roomToken });
  // Pass the new react list to start-reducer to pre-set the change => for UX purpose
  yield put({ type: REACT_TO_QUESTION_START, eventCode, index, newData });
  try {
    yield put({ type: REACT_TO_QUESTION_SUCCESS, index, id, eventCode, isLike });
  } catch(err) {
    // pass the old react list to fail reducer to restore the data before submitting
    yield put({ type: REACT_TO_QUESTION_FAIL, eventCode, index, oldData });
  }
}


export default function* eventSaga() {
  yield [
    takeLatest(FETCH_EVENT, fetchEvent),
    takeLatest(ADD_QUESTION, addQuestion),
    takeLatest(REACT_TO_QUESTION, reactToQuestion),
  ]
}