"use client";

import { useState } from "react";
import AuthService from "@/services/AuthService";
import { useSnackbar } from "notistack";

const Signup = ({ onSignupSuccess }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: {},
    loading: false,
    success: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const alert = (msg, type) => {
    if (!msg) return null;

    return (
      <div
        className={`text-sm ${
          type === "green"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {msg}
      </div>
    );
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra password
    if (data.password !== data.cPassword) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: {
          ...prev.error,
          password: "Password doesn't match",
          cPassword: "Password doesn't match",
        },
      }));

      return;
    }

    setData((prev) => ({
      ...prev,
      loading: true,
      error: {},
    }));

    try {
      const responseData = await AuthService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });

      if (responseData?.error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        }));

        return;
      }

      if (responseData?.success) {
        setData({
          name: "",
          email: "",
          password: "",
          cPassword: "",
          error: {},
          loading: false,
          success: true,
        });

        enqueueSnackbar(
          "Account Created Successfully..!",
          {
            variant: "success",
            autoHideDuration: 2000,
          }
        );

        if (onSignupSuccess) {
          onSignupSuccess();
        }
      }
    } catch (error) {
      console.error("Signup error:", error);

      setData((prev) => ({
        ...prev,
        loading: false,
        error: {
          general: "Something went wrong. Please try again.",
        },
      }));
    }
  };

  return (
    <>
      <div className="text-center text-2xl mb-6">
        Register
      </div>

      <form
        className="space-y-4"
        onSubmit={formSubmit}
      >
        {/* Success */}
        {data.success &&
          alert(
            "Account created successfully!",
            "green"
          )}

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name">
            Name
            <span className="text-sm text-gray-600 ml-1">
              *
            </span>
          </label>

          <input
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                success: false,
                error: {},
                name: e.target.value,
              }))
            }
            value={data.name}
            type="text"
            id="name"
            className={`${
              data.error?.name
                ? "border-red-500"
                : ""
            } px-4 py-2 focus:outline-none border`}
          />

          {alert(data.error?.name, "red")}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">
            Email address
            <span className="text-sm text-gray-600 ml-1">
              *
            </span>
          </label>

          <input
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                success: false,
                error: {},
                email: e.target.value,
              }))
            }
            value={data.email}
            type="email"
            id="email"
            className={`${
              data.error?.email
                ? "border-red-500"
                : ""
            } px-4 py-2 focus:outline-none border`}
          />

          {alert(data.error?.email, "red")}
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
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                success: false,
                error: {},
                password: e.target.value,
              }))
            }
            value={data.password}
            type="password"
            id="password"
            className={`${
              data.error?.password
                ? "border-red-500"
                : ""
            } px-4 py-2 focus:outline-none border`}
          />

          {alert(data.error?.password, "red")}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="cPassword">
            Confirm password
            <span className="text-sm text-gray-600 ml-1">
              *
            </span>
          </label>

          <input
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                success: false,
                error: {},
                cPassword: e.target.value,
              }))
            }
            value={data.cPassword}
            type="password"
            id="cPassword"
            className={`${
              data.error?.cPassword
                ? "border-red-500"
                : ""
            } px-4 py-2 focus:outline-none border`}
          />

          {alert(data.error?.cPassword, "red")}
        </div>

        {/* Remember Me */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={data.loading}
          style={{ background: "#303031" }}
          className="w-full px-4 py-2 text-white text-center cursor-pointer font-medium disabled:opacity-50"
        >
          {data.loading
            ? "Creating account..."
            : "Create an account"}
        </button>
      </form>
    </>
  );
};

export default Signup;