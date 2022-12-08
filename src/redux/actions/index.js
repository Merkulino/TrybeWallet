const USER_LOGIN = 'USER_LOGIN';

const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export default userLogin;
