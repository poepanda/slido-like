import {
  ME_LOGIN_START,
  ME_LOGIN_SUCCESS,
  ME_LOGIN_FAIL,
  ME_REGISTER_START,
  ME_REGISTER_SUCCESS,
  ME_REGISTER_FAIL,
  ME_LOGOUT_START,
  ME_LOGOUT_SUCCESS,
  ME_LOGOUT_FAIL,
  ME_GET_ROOM_TOKEN_START,
  ME_GET_ROOM_TOKEN_SUCCESS,
  ME_GET_ROOM_TOKEN_FAIL,
} from './actionTypes';

const initialState = {
  authenticated: false,
  inProgress: false,
  errors: null,
  roomTokens: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ME_LOGIN_START: {
      return {
        ...state
      }
    }
    case ME_LOGIN_SUCCESS: {
      return {
        ...state,
        authenticated: true
      }
    }
    case ME_LOGIN_FAIL: {
      return {
        ...state
      }
    }
    case ME_REGISTER_START: {
      return {
        ...state
      }
    }
    case ME_REGISTER_SUCCESS: {
      return {
        ...state,
        authenticated: true
      }
    }
    case ME_REGISTER_FAIL: {
      return {
        ...state
      }
    }
    case ME_LOGOUT_START: {
      return {
        ...state
      }
    }
    case ME_LOGOUT_SUCCESS: {
      return {
        ...state,
        authenticated: false
      }
    }
    case ME_LOGOUT_FAIL: {
      return {
        ...state
      }
    }
    case ME_GET_ROOM_TOKEN_START: {
      return {
        ...state,
        inProgress: true,
      }
    }
    case ME_GET_ROOM_TOKEN_SUCCESS: {
      const newRoomTokens = {...state.roomTokens}
      newRoomTokens[action.eventCode] = action.token;
      return {
        ...state,
        inProgress: false,
        roomTokens: newRoomTokens,
      }
    }
    case ME_GET_ROOM_TOKEN_FAIL: {
      return {
        ...state,
        inProgress: false,
        errors: action.errors,
      }
    }
    default: return state;
  }
};