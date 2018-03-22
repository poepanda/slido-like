import { put, takeLatest, call } from 'redux-saga/effects';

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

import { createEventApi, adminFetchEventsApi } from './api';
import { getErrors } from 'app/services/transform';

function* createEvent({ name, code, from, to }) {
  yield put({ type: CREATE_EVENT_START });
  try {
    const result = yield call(createEventApi, { name, code, from, to });
    if (result) {
      const data = { id: result.data.id, name, code, from, to };
      yield put({ type: CREATE_EVENT_SUCCESS, data });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: CREATE_EVENT_FAIL, errors });
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
    const result = yield call(adminFetchEventsApi);
    if (result) {
      const data = result.data.event;
      yield put({ type: ADMIN_FETCH_EVENT_SUCCESS, data });
    }
  } catch(err) {
    const errors = getErrors(err);
    yield put({ type: ADMIN_FETCH_EVENT_FAIL, errors });
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