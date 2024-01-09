import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error, emptyFields } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200/60">
      <div className="w-[70%] h-[50vh] flex gap-8">
        {/* left  */}
        <div className="h-full w-full flex flex-col justify-center">
          <h1 className="text-4xl font-black text-blue-800 mb-2">
            Social Media (Jahz10)
          </h1>
          <p className="text-gray-500 text-lg">
            Connect with friends and the world around you on Jahz10 Social
          </p>
        </div>
        {/* right  */}
        <div className="h-full w-full flex flex-col justify-between bg-white rounded-lg p-3">
          <input
            type="email"
            placeholder="Email"
            className={
              emptyFields.includes("email")
                ? "w-full p-3 border border-red-500 rounded-xl focus:outline-none"
                : "w-full p-3 border rounded-xl border-gray-400/90 focus:outline-none"
            }
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={
              emptyFields.includes("password")
                ? "w-full p-3 border border-red-500 rounded-xl focus:outline-none"
                : "w-full p-3 border rounded-xl border-gray-400/90 focus:outline-none"
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={isLoading}
            onClick={handleLogin}
            className="w-full py-2 text-white font-semibold  bg-blue-800 rounded-xl"
          >
            {isLoading ? (
              <CircularProgress size={15} />
            ) : (
              "Login"
            )}
          </button>
          {error && (
            <p className="font-semibold text-red-500 text-center my-2">
              {error}
            </p>
          )}
          <div className="w-full flex flex-col justify-center">
            <span className="text-blue-800 my-3 text-center cursor-pointer">
              Forgot Password
            </span>
            <Link
              to="/register"
              className="w-2/3 mx-auto py-2 text-white font-semibold  bg-green-500 rounded-xl text-center"
            >
              <button>Create New Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
