const USER_TOKEN_KEY = "USER_TOKEN_KEY";

export default class ApplicationStorage {
  getUserToken() {
    return localStorage.getItem(USER_TOKEN_KEY);
  }

  setUserToken(userToken) {
    if (!userToken) {
      localStorage.removeItem(USER_TOKEN_KEY);
    } else {
      localStorage.setItem(USER_TOKEN_KEY, userToken);
    }
  }
}
