import { 
  ME_LOGIN,
  ME_REGISTER,
  ME_LOGOUT,
  ME_GET_ROOM_TOKEN
} from './actionTypes';

export const register = (displayName, email, password) => ({
  type: ME_REGISTER,
  displayName,
  email,
  password
})

export const login = (email, password) => ({
  type: ME_LOGIN,
  email,
  password
})

export const logout = () => ({
  type: ME_LOGOUT,
})

export const getRoomToken = (eventCode) => ({
  type: ME_GET_ROOM_TOKEN,
  eventCode
})