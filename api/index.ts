import { get, post } from './fetch';

export const login = (params: {}) => post({ url: '/pet/account/login.json', params });
export const register = (params: {}) => post({ url: '/pet/account/signUp.json', params });
export const resetPassword = (params: {}) => post({ url: '/pet/account/resetPassword.json', params });
export const getVerificationCode = (params: {}) => get({ url: '/pet/account/getVerificationCode.json', params });
