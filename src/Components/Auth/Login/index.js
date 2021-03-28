import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { BiLoader } from "react-icons/bi";

import { signIn } from "../../../Redux/actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <>
        <span className="text-red-700 font-bold">Error</span>
        <span className="text-red-700"> This field must be filled!</span>
      </>
    );
  }
};

const LoginComponent = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(signIn(username, password))
        .then((data) => {
          props.history.push("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error Sign In ", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    <Redirect to="/" />;
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form onSubmit={handleSignIn} ref={form}>
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
      {message && (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Error! </strong>
          <span class="block sm:inline">{message}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div class="relative mb-4">
        <label for="username" class="leading-7 text-sm text-gray-600">
          Username
        </label>
        <Input
          type="text"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter your username or email"
          name="username"
          value={username}
          onChange={onChangeUsername}
          validations={[required]}
        />
      </div>
      <div className="relative mb-4">
        <label for="password" class="leading-7 text-sm text-gray-600">
          Password
        </label>
        <Input
          type={showPassword ? "text" : "password"}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={onChangePassword}
          validations={[required]}
        />
      </div>

      <div className="relative mb-4 flex space-x-3 items-center">
        <input
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          type="checkbox"
          id="show_password"
          class="checked:bg-blue-600 checked:border-transparent"
        />
        <label for="show_password" class="leading-7 text-sm text-gray-600">
          Show Password
        </label>
      </div>

      <button class="text-white flex-inline bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        {loading ? (
          <BiLoader className="text-white animate-spin text-xl" />
        ) : (
          "Sign In"
        )}
      </button>

      <CheckButton style={{ display: "none" }} ref={checkBtn} />
      <p class="text-xs text-gray-500 mt-3">
        Literally you probably haven't heard of them jean shorts.
      </p>
    </Form>
  );
};

export default withRouter(LoginComponent);
