import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("User");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
