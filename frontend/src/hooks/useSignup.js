import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useContext(AuthContext);

  const signup = async (username, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      // save the user to localStorage
      localStorage.setItem("User", JSON.stringify(json));

      // update the AuthContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, emptyFields };
};
