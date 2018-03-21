import { postPublic, getPublic } from 'app/services/api';

export const loginApi = ({ email, password }) => {
  return postPublic('/login', { email, password });
}

export const registerApi = ({ email, name, password }) => {
  return postPublic('/register', { email, name, password });
}

export const logoutApi = () => {
  return getPublic('/logout');
}