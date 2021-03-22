import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../Context/Auth/AuthContext/";
import axios from "axios";
import { API_URL } from "../../../Utils/API";
import { withRouter } from "react-router-dom";

const LoginComponent = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loginUser, error, isAuthUser } = authContext;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const initialValue = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialValue);

  const { username, password } = user;

  useEffect(() => {
    isAuthUser();
    if (isAuthenticated) {
        props.history.push("/dashboard");
    }
    if (error) {
      console.log(error);
    }
  }, [error, isAuthenticated, props.history]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const formData = { username, password };
    const login = await axios
      .post(`${API_URL}auth/sign-in`, formData)
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    if (login.status === 200) {
      loginUser(login.data);
      setLoading(false);
    } else {
      setMessage(login.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
      <div class="relative mb-4">
        <label for="username" class="leading-7 text-sm text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="Enter your username"
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={handleChange}
        />
      </div>
      <div className="relative mb-4">
        <label for="password" class="leading-7 text-sm text-gray-600">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Enter your password"
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={handleChange}
          value={password}
        />
      </div>

      <div className="relative mb-4 flex space-x-3 items-center">
        <input
          onClick={() => {setShowPassword(!showPassword)}}
          type="checkbox"
          id="show_password"
          class="checked:bg-blue-600 checked:border-transparent"
        />
        <label for="show_password" class="leading-7 text-sm text-gray-600">
          Show Password
        </label>
      </div>

      <button
        onClick={handleLogin}
        class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Button
      </button>
      <p class="text-xs text-gray-500 mt-3">
        Literally you probably haven't heard of them jean shorts.
      </p>
    </div>
  );
};

export default withRouter(LoginComponent);
