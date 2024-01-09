import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, isLoading, error, emptyFields } = useSignup();

  const handleRegister = async (e) => {
    e.preventDefault();

    await signup(username, email, password, confirmPassword);
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center  bg-gray-200/60">
      <div className="w-[70%] h-[65vh] flex gap-8">
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
            type="username"
            placeholder="Username"
            className={
              emptyFields.includes("username")
                ? "w-full p-3 border border-red-500 rounded-xl"
                : "w-full p-3 border rounded-xl border-gray-400/90"
            }
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={
              emptyFields.includes("email")
                ? "w-full p-3 border border-red-500 rounded-xl"
                : "w-full p-3 border rounded-xl border-gray-400/90"
            }
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={
              emptyFields.includes("password")
                ? "w-full p-3 border border-red-500 rounded-xl"
                : "w-full p-3 border rounded-xl border-gray-400/90"
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={
              emptyFields.includes("confirmPassword")
                ? "w-full p-3 border border-red-500 rounded-xl"
                : "w-full p-3 border rounded-xl border-gray-400/90"
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            disabled={isLoading}
            onClick={handleRegister}
            className="w-full py-3 text-white font-semibold  bg-blue-800 rounded-xl"
          >
            {isLoading ? <CircularProgress size={15} /> : "Sign up"}
          </button>
          {error && (
            <p className="font-semibold text-red-500 text-center my-2">
              {error}
            </p>
          )}
          <div className="w-full flex flex-col justify-center">
            <Link
              to="/login"
              className="w-2/3 mx-auto py-3 text-white font-semibold  bg-green-500 rounded-xl text-center"
            >
              <button>Log into Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
