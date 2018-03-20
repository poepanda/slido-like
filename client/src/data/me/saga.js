import { put, takeLatest, all } from 'redux-saga/effects';

import {
  ME_LOGIN,
  ME_LOGIN_START,
  ME_LOGIN_SUCCESS,
  ME_LOGIN_FAIL,
  ME_REGISTER,
  ME_REGISTER_START,
  ME_REGISTER_SUCCESS,
  ME_REGISTER_FAIL,
  ME_LOGOUT,
  ME_LOGOUT_START,
  ME_LOGOUT_SUCCESS,
  ME_LOGOUT_FAIL,
  ME_GET_ROOM_TOKEN,
  ME_GET_ROOM_TOKEN_START,
  ME_GET_ROOM_TOKEN_SUCCESS,
  ME_GET_ROOM_TOKEN_FAIL,
} from './actionTypes';

function* login({ email, password }) {
  yield put({ type: ME_LOGIN_START });
  try {
    yield put({ type: ME_LOGIN_SUCCESS });
  } catch(err) {
    yield put({ type: ME_LOGIN_FAIL, err });
  }
}

function* register({ displayName, email, password }) {
  yield put({ type: ME_REGISTER_START });
  try {
    yield put({ type: ME_REGISTER_SUCCESS });
    yield put({ type: ME_LOGIN });
  } catch(err) {
    yield put({ type: ME_REGISTER_FAIL, err });
  }
}

function* logout() {
  yield put({ type: ME_LOGOUT_START });
  try {
    yield put({ type: ME_LOGOUT_SUCCESS });
  } catch(err) {
    yield put({ type: ME_LOGOUT_FAIL, err });
  }
}

function* getRoomToken({ eventCode }) {
  yield put({ type: ME_GET_ROOM_TOKEN_START });
  try {
    yield put({ type: ME_GET_ROOM_TOKEN_SUCCESS, eventCode, token: 'thisisyourtokenblahblah' });
  } catch(err) {
    yield put({ type: ME_GET_ROOM_TOKEN_FAIL });
  }
}

export default function* meSaga() {
  yield all([
    takeLatest(ME_LOGIN, login),
    takeLatest(ME_REGISTER, register),
    takeLatest(ME_LOGOUT, logout),
    takeLatest(ME_GET_ROOM_TOKEN, getRoomToken),
  ])
}