import createJWT from '../../utils/createJWT';

const wrongEmailLoginPostMock = {
  email: 'user@admin.com',
  password: 'secret_user',
};

const loginErrorMessage = {
  message: 'Incorrect email or password',
};

const wrongPasswordLoginMock = {
  email: 'user@user.com',
  password: '1234567',
};

const emptyFieldsLoginMock = {
  email: '',
  password: '',
};

const emptyFieldsErrorMessage = {
  message: 'All fields must be filled',
};

const rightFieldsLoginMock = {
  email: 'user@user.com',
  password: 'secret_user',
};

const rightTokenMock = createJWT(rightFieldsLoginMock.email);

const wrongTokenMock = rightTokenMock.slice(-1) + 'ç';

const userMock = {
  id: 1,
  username: 'user',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

const tokenErrorMessage = {
  message: 'Token must be a valid token',
};

const withoutTokenErrorMessage = {
  message: 'Unauthorized user',
};

export {
  loginErrorMessage,
  wrongEmailLoginPostMock,
  wrongPasswordLoginMock,
  emptyFieldsLoginMock,
  emptyFieldsErrorMessage,
  rightFieldsLoginMock,
  rightTokenMock,
  userMock,
  wrongTokenMock,
  tokenErrorMessage,
  withoutTokenErrorMessage,
};
