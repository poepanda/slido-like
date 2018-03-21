import { delay } from 'redux-saga'
import { put, call, takeLatest, all } from 'redux-saga/effects';

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

import { loginApi, registerApi, logoutApi } from './api';
import { getErrors } from 'app/services/transform';

function* login({ email, password }) {
  yield put({ type: ME_LOGIN_START });
  try {
    const loginResult = yield call(loginApi, { email, password });
    if (loginResult) {
      yield put({ type: ME_LOGIN_SUCCESS, token: loginResult.data.token });
    }
  } catch(err) {
    const errors = getErrors(err, 'login');
    yield put({ type: ME_LOGIN_FAIL, errors });
  }
}

function* register({ name, email, password }) {
  yield put({ type: ME_REGISTER_START });
  try {
    const registerResult = yield call(registerApi, { name, email, password });
    if (registerResult) {
      yield put({ type: ME_REGISTER_SUCCESS, token: registerResult.data.token });
    }
  } catch(err) {
    const errors = getErrors(err, 'register');
    yield put({ type: ME_REGISTER_FAIL, errors });
  }
}

function* logout() {
  yield put({ type: ME_LOGOUT_START });
  try {
    const logoutResult = yield call(logoutApi);
    if (logoutResult) {
      yield put({ type: ME_LOGOUT_SUCCESS });
    }
  } catch(err) {
    const errors = getErrors(err, 'logout');
    yield put({ type: ME_LOGOUT_FAIL, errors });
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