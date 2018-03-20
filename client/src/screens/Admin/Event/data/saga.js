import { put, takeLatest } from 'redux-saga/effects';

import {
  ADMIN_FETCH_EVENT,
  ADMIN_FETCH_EVENT_START,
  ADMIN_FETCH_EVENT_SUCCESS,
  ADMIN_FETCH_EVENT_FAIL,
  CREATE_EVENT,
  CREATE_EVENT_START,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  EDIT_QUESTION,
  EDIT_QUESTION_START,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAIL,
  DELETE_QUESTION,
  DELETE_QUESTION_START,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
} from './actionTypes';

function* createEvent({ name, eventCode, from, to }) {
  yield put({ type: CREATE_EVENT_START });
  try {
    yield put({ 
      type: CREATE_EVENT_SUCCESS,
      name,
      eventCode,
      from,
      to,
      id: 123 // This will be returned by the server
    });
  } catch(err) {
    yield put({ type: CREATE_EVENT_FAIL });
  }
}

function* deleteQuestion({ index, id }) {
  yield put({ type: DELETE_QUESTION_START, index });
  try {
    yield put({ type: DELETE_QUESTION_SUCCESS, index });
  } catch(err) {
    yield put({ type: DELETE_QUESTION_FAIL });
  }
}

function* adminFetchEvent() {
  yield put({ type: ADMIN_FETCH_EVENT_START });
  try {
    yield put({ type: ADMIN_FETCH_EVENT_SUCCESS });
  } catch(err) {
    yield put({ type: ADMIN_FETCH_EVENT_FAIL });
  }
}

function* editQuestion({ index, id, newContent }) {
  yield put({ type: EDIT_QUESTION_START, index });
  try {
    yield put({ type:  EDIT_QUESTION_SUCCESS, index, newContent });
  } catch(err) {
    yield put({ type: EDIT_QUESTION_FAIL });
  }
}

export default function* adminEvent() {
  yield [
    takeLatest(ADMIN_FETCH_EVENT, adminFetchEvent),
    takeLatest(CREATE_EVENT, createEvent),
    takeLatest(EDIT_QUESTION, editQuestion),
    takeLatest(DELETE_QUESTION, deleteQuestion),
  ]
}