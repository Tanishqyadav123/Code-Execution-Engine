"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { allowedPathName } from "../constants/allowedPathName";
import { getUserProfile } from "../services/auth.service";
import { LoggedInUserType } from "../interface/auth.interface";

export interface AuthContextType {
  isAuth: boolean;
  handleSignOut: () => void;
  userDetails: LoggedInUserType | null;
  setUserDetails: Dispatch<SetStateAction<LoggedInUserType | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  initailizeAuth: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathName: string = usePathname();
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<LoggedInUserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Create a function for fetching the user Details :-
  async function initailizeAuth() {
    const accessToken = localStorage.getItem("accessToken");

    console.log("line 42", accessToken);

    if (!accessToken) {
      setIsAuth(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await getUserProfile();
      console.log(response.data, " line 51");
      if (!response.data) {
        setUserDetails(null);
        setIsAuth(false);
      } else if (response.data) {
        setUserDetails(response.data);
        setIsAuth(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("Initialized");
  }, []);

  useEffect(() => {
    // Extract the token (auth) from localStorage :-
    initailizeAuth();
    const accessToken = localStorage.getItem("accessToken");
    console.log(allowedPathName, pathName, accessToken);

    if (allowedPathName.includes(pathName) && !accessToken) {
      setIsAuth(false);
      router.push("/sign-in");
    } else if (!allowedPathName.includes(pathName) && accessToken) {
      setIsAuth(true);
      router.push("/");
    } else {
      setIsAuth(accessToken ? true : false);
    }
  }, []);

  const handleSignOut = () => {
    console.log("hello");
    // Create the token and Redirect to Sign In Form :-
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
      setIsAuth(false);
    }
    router.push("/sign-in");
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        handleSignOut,
        setUserDetails,
        userDetails,
        isLoading,
        setIsLoading,
        initailizeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Creating a useAuth hook for fetching the logged In User :-

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth Context is not initailized");
  }
  return context;
};
