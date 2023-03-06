import { get, post } from './fetch';

export const login = (params: {}) => post({ url: '/pet/account/login.json', params });
export const signUp = (params: {}) => post({ url: '/pet/account/signUp.json', params });
export const resetPassword = (params: {}) => post({ url: '/pet/account/resetPassword.json', params });
export const getVerificationCode = (params: {}) => get({ url: '/pet/account/getVerificationCode.json', params });

export const queryDetail = (params: {}) => get({ url: '/pet/userInfo/queryDetail.json', params });
export const updateUserInfo = (params: {}) => post({ url: '/pet/userInfo/updateUserInfo.json', params });
export const upload = (params: {}) => post({ url: '/pet/tool/upload.json', params }, 'multipart/form-data');
export const createPet = (params: {}) => post({ url: '/pet/userInfo/createPet.json', params });
export const editPet = (params: {}) => post({ url: '/pet/userInfo/editPet.json', params });
export const deletePet = (params: {}) => get({ url: '/pet/userInfo/deletePet.json', params });



export const addPetStory = (params: {}) => post({ url: '/pet/card/addCard.json', params }, 'multipart/form-data');
export const changeStatus = (params: {}) => post({ url: '/pet/card/updateStatus.json', params });