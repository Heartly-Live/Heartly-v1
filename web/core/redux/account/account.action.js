import {
  REMOVE_LOGGED_USER,
  SET_LOGGED_USER,
  SET_LOGGED_USER_DATA,
} from "../constant";

export const loginAction = (payload) => {
  return {
    type: SET_LOGGED_USER,
    payload,
  };
};

export const logoutAction = () => {
  return {
    type: REMOVE_LOGGED_USER,
    payload: {
      isLoggedIn: false,
      token: "",
      authUser: "",
    },
  };
};

export const loggedProfileDataAction = (payload) => {
  return {
    type: SET_LOGGED_USER_DATA,
    payload,
  };
};


