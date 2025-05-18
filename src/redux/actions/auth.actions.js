import axios from "axios";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../types/auth.types";

// Signup Action Creators
export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

// Signin Action Creators
export const signinRequest = () => ({
  type: SIGNIN_REQUEST,
});

export const signinSuccess = (data) => ({
  type: SIGNIN_SUCCESS,
  payload: data,
});

export const signinFailure = (error) => ({
  type: SIGNIN_FAILURE,
  payload: error,
});

// Logout Action Creators
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

// Thunk Actions
export const signup = (userData) => async (dispatch) => {
  dispatch(signupRequest());

  try {
    const signupResponse = await axios.post(
      "http://streaming.nexlesoft.com:3001/auth/signup",
      {
        firstName: userData.firstname,
        lastName: userData.lastname,
        email: userData.email,
        password: userData.password,
      }
    );

    dispatch(signupSuccess(signupResponse.data));

    // After successful signup, automatically signin
    return await dispatch(
      signin({
        email: userData.email,
        password: userData.password,
      })
    );
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during signup";
    dispatch(signupFailure(errorMessage));
    throw error;
  }
};

export const signin = (credentials) => async (dispatch) => {
  dispatch(signinRequest());

  try {
    const response = await axios.post(
      "http://streaming.nexlesoft.com:3001/auth/signin",
      credentials
    );

    const { accessToken, refreshToken, ...userData } = response.data;

    // Store tokens in browser storage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("isAuthorized", true);

    dispatch(signinSuccess(userData?.user));
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during signin";
    dispatch(signinFailure(errorMessage));
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());

  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("No authentication tokens found");
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    await axios.post(
      "http://streaming.nexlesoft.com:3001/auth/signout",
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(logoutSuccess());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during logout";
    dispatch(logoutFailure(errorMessage));

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    throw error;
  }
};
