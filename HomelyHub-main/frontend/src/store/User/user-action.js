import { userActions } from "./user-slice";
import { axiosInstance } from "../../utils/axios";

// signup
export const getSignup = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getSignupRequest());
    const { data } = await axiosInstance.post("/v1/rent/user/signup", user);
    dispatch(userActions.getSignupDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error?.response?.data?.message));
  }
};

// login
export const getLogin = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getLoginRequest());
    const { data } = await axiosInstance.post("/v1/rent/user/login", user);
    dispatch(userActions.getLoginDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error?.response?.data?.message));
  }
};

// current user
export const currentUser = () => async (dispatch) => {
  try {
    dispatch(userActions.getCurrentRequest());
    const { data } = await axiosInstance.get("/v1/rent/user/me");
    dispatch(userActions.getCurrentUser(data.user));
  } catch (error) {
    dispatch(userActions.getLogout(null));
  }
};

// update user
export const updateUser = (updateuser) => async (dispatch) => {
  try {
    dispatch(userActions.getUpdateUserRequest());
    const response = await axiosInstance.post("/v1/rent/user/updateMe", updateuser);
    console.log(response);
    const { data } = await axiosInstance.get("/v1/rent/user/me");
    dispatch(userActions.getCurrentUser(data.user));
  } catch (error) {
    dispatch(userActions.getError(error?.response?.data?.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    await axiosInstance.post("/v1/rent/user/forgotPassword", { email });
  } catch (error) {
    dispatch(userActions.getError(error?.response?.data?.message));
  }
};

// reset password
export const resetPassword = (repassword, token) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/v1/rent/user/resetPassword/${token}`, repassword);
  } catch (error) {
    dispatch(userActions.getError(error?.response?.data?.message));
  }
};

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch(userActions.getPasswordRequest());
    await axiosInstance.patch("/v1/rent/user/updateMyPassword", password);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    dispatch(userActions.getError(error?.response?.data?.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/v1/rent/user/logout");
    dispatch(userActions.getLogout(null));
  } catch (error) {
    dispatch(userActions.getError(error?.response?.data?.message));
  }
};