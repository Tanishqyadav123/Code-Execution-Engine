import { signInFormType } from "../appComponents/signinForm";
import axios from "axios";
import { ApiResponse } from "../types/api";
import { signInResponseType } from "../types/auth.response.type";
import { signUpFormType } from "../appComponents/signupForm";
import { LoggedInUserType } from "../interface/auth.interface";
// API calls for Authentication Module :-

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("accessToken");
};

export const signInUserService = async (data: signInFormType) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/sign-in`,
    data
  );

  return response.data as ApiResponse<signInResponseType>;
};
export const signUpUserService = async (data: signUpFormType) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/sign-up`,
    data
  );

  return response.data as ApiResponse<void>;
};

export const getUserProfile = async () => {
  const token = getToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as ApiResponse<LoggedInUserType>;
};
