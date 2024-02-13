import { emailRegex } from "./Constant";
import { USER_ID } from "./Constant";

export const showPassword = () => {
  var inputPassword: any = document.getElementById("userPassword");
  if (inputPassword.type === "password") {
    return (inputPassword.type = "text");
  } else {
    return (inputPassword.type = "password");
  }
};

export const isValidCredInput = (
  email: string,
  password: string,
  confirmPassword: string | undefined = undefined,
) => {
  if (!emailRegex.test(email)) {
    throw new Error("*Kindly check the mail entered!");
  }
  if (password.length < 6 && password.length > 20) {
    throw new Error("*Password length must be between 6-20 characters!");
  }
  if (confirmPassword != undefined && confirmPassword != password) {
    throw new Error("*Confirm password didn't match password!");
  }
  return true;
};

export const getUserFromLocalStorage = () => {
  const currentUserId = localStorage.getItem(USER_ID);
  return currentUserId;
};

export const setUserOnLocalStorage = (value: any) => {
  const currentUserId = localStorage.setItem(USER_ID, value);
  return currentUserId;
};

export const deleteUserFromLocalStorage = () => {
  const currentUserId = localStorage.getItem(USER_ID);
  return currentUserId;
};
