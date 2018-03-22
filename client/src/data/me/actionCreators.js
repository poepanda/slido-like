import { 
  ME_LOGIN,
  ME_REGISTER,
  ME_LOGOUT,
  ME_GET_ROOM_TOKEN,
  ME_CLEAN_ERROR
} from './actionTypes';

export const register = ({ name, email, password }) => ({
  type: ME_REGISTER,
  name,
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

export const getRoomToken = (code) => ({
  type: ME_GET_ROOM_TOKEN,
  code
})

export const cleanError = () => ({
  type: ME_CLEAN_ERROR
})