"use client";

import { useState, useContext } from "react";
import AuthService from "@/services/AuthService";
import { LayoutContext } from "../index";
import { useSnackbar } from "notistack";

const Login = () => {
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const alert = (msg) => (
    <div className="text-xs text-red-500">{msg}</div>
  );

  const formSubmit = async (e) => {
    e.preventDefault();

    setData((prev) => ({
      ...prev,
      loading: true,
      error: false,
    }));

    try {
      const responseData = await AuthService.login({
        email: data.email,
        password: data.password,
      });

      if (responseData?.error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: responseData.error,
          password: "",
        }));

        return;
      }

      if (responseData?.token) {
        localStorage.setItem("jwt", JSON.stringify(responseData));

        setData({
          email: "",
          password: "",
          loading: false,
          error: false,
        });

        enqueueSnackbar("Login Completed Successfully..!", {
          variant: "success",
          autoHideDuration: 2000,
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
    } catch (error) {
      console.error("Login error:", error);

      setData((prev) => ({
        ...prev,
        loading: false,
        error: "Login failed. Please try again.",
      }));
    }
  };

  return (
    <>
      <div className="text-center text-2xl mb-6">
        Login
      </div>

      {layoutData?.loginSignupError && (
        <div className="bg-red-200 py-2 px-4 rounded">
          You need to login for checkout. Haven&apos;t account? Create new one.
        </div>
      )}

      <form
        className="space-y-4"
        onSubmit={formSubmit}
      >
        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">
            Username or email address
            <span className="text-sm text-gray-600 ml-1">
              *
            </span>
          </label>

          <input
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                email: e.target.value,
                error: false,
              }));

              layoutDispatch({
                type: "loginSignupError",
                payload: false,
              });
            }}
            value={data.email}
            type="text"
            id="email"
            className={`${
              data.error ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />

          {data.error && alert(data.error)}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password">
            Password
            <span className="text-sm text-gray-600 ml-1">
              *
            </span>
          </label>

          <input
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                password: e.target.value,
                error: false,
              }));

              layoutDispatch({
                type: "loginSignupError",
                payload: false,
              });
            }}
            value={data.password}
            type="password"
            id="password"
            className={`${
              data.error ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />

          {data.error && alert(data.error)}
        </div>

        {/* Remember me */}
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />

            <label htmlFor="rememberMe">
              Remember me
              <span className="text-sm text-gray-600">
                *
              </span>
            </label>
          </div>

          <a
            className="block text-gray-600"
            href="/"
          >
            Lost your password?
          </a>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={data.loading}
          style={{ background: "#303031" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer w-full disabled:opacity-50"
        >
          {data.loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default Login;