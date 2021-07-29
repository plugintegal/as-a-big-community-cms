import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { BiLoader } from "react-icons/bi";
import { signIn } from "../../../Redux/actions/auth";

const LoginComponent = () => {
  const history = useHistory();
  const [errorLogin, setErrorLogin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    setLoading(true);

    dispatch(signIn(values.username, values.password))
      .then((data) => {
        history.push("/");
      })
      .catch((error) => {
        setErrorLogin(error)
        console.log(error)
        setLoading(false);
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const dispatch = useDispatch();

  if (isLoggedIn) {
    <Redirect to="/" />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Sign In
      </h2>
      <span className="text-red-500 text-sm">{errorLogin}</span>
      <div className="relative mb-4">
        <label htmlFor="username" className="leading-7 text-sm text-gray-600">
          Username
        </label>
        <input
          type="text"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter your username or email"
          name="username"
          value={formik.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <span className="text-red-500 text-sm">{formik.errors.username}</span>
        ) : null}
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter your password"
          name="password"
          value={formik.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <span className="text-red-500 text-sm">{formik.errors.password}</span>
        ) : null}
      </div>

      <div className="relative mb-4 flex space-x-3 items-center">
        <input
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          type="checkbox"
          id="show_password"
          className="checked:bg-blue-600 checked:border-transparent"
        />
        <label htmlFor="show_password" className="leading-7 text-sm text-gray-600">
          Show Password
        </label>
      </div>

      <button className="text-white flex-inline bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        {loading ? (
          <BiLoader className="text-white animate-spin text-xl" />
        ) : (
          "Sign In"
        )}
      </button>

      <p className="text-xs text-gray-500 mt-3">
        Literally you probably haven't heard of them jean shorts.
      </p>
    </form>
  );
};

export default withRouter(LoginComponent);
