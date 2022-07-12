import Cookies from 'js-cookie';
export const TOKEN_KEY = 'stuinfo';

export default {
  setToken: token => {
    Cookies.set(TOKEN_KEY, token, {
      // token在Cookie中存储的天数，默认1天
      expires: 1
    });
  },
  getToken: () => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) return token;
    else return null;
  },
  clearToken: () => {
    Cookies.remove(TOKEN_KEY);
  }
};
