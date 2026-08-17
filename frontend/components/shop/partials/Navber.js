"use client";

import React, { Fragment, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import "./style.css";

import AuthService from "@/services/AuthService";
import { LayoutContext } from "../layout";

const Navber = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, dispatch } = useContext(LayoutContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  // Kiểm tra đăng nhập phía client
  useEffect(() => {
    const jwt = AuthService.isAuthenticate();

    setIsLoggedIn(!!jwt);
    setIsAdminUser(AuthService.isAdmin());
  }, []);

  const navberToggleOpen = () => {
    dispatch({
      type: "hamburgerToggle",
      payload: !data.navberHamburger,
    });
  };

  const loginModalOpen = () => {
    dispatch({
      type: "loginSignupModalToggle",
      payload: !data.loginSignupModal,
    });
  };

  const cartModalOpen = () => {
    dispatch({
      type: "cartModalToggle",
      payload: !data.cartModal,
    });
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setIsAdminUser(false);
    router.push("/");
  };

  return (
    <Fragment>
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-4 lg:grid-cols-3">

          {/* Desktop menu */}
          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1">
            <span
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Shop
            </span>

            <span
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              onClick={() => router.push("/blog")}
            >
              Blog
            </span>

            <span
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              onClick={() => router.push("/contact-us")}
            >
              Contact us
            </span>
          </div>

          {/* Mobile logo + hamburger */}
          <div className="col-span-2 lg:hidden flex justify-items-stretch items-center">
            <svg
              onClick={navberToggleOpen}
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>

            <span
              onClick={() => router.push("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="flex items-center text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2"
            >
              Sport
            </span>
          </div>

          {/* Desktop logo */}
          <div
            onClick={() => router.push("/")}
            style={{ letterSpacing: "0.70rem" }}
            className="hidden lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer"
          >
            Sport
          </div>

          {/* Right menu */}
          <div className="flex items-right col-span-2 lg:col-span-1 flex justify-end">

            {/* Wishlist */}
            <div
              onClick={() => router.push("/wish-list")}
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer"
              title="Wishlist"
            >
              <svg
                className={`${
                  pathname === "/wish-list"
                    ? "fill-current text-gray-800"
                    : ""
                } w-8 h-8 text-gray-600 cursor-pointer`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            {/* User */}
            {isLoggedIn ? (
              <Fragment>
                <div
                  className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative"
                  title="Account"
                >
                  <svg
                    className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">

                    {/* USER */}
                    {!isAdminUser ? (
                      <li className="flex flex-col text-gray-700 w-48 shadow-lg list-none">

                        <span
                          onClick={() => router.push("/user/orders")}
                          className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                        >
                          <span>My Orders</span>
                        </span>

                        <span
                          onClick={() => router.push("/user/profile")}
                          className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                        >
                          <span>My Account</span>
                        </span>

                        <span
                          onClick={() => router.push("/wish-list")}
                          className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                        >
                          <span>My Wishlist</span>
                        </span>

                        <span
                          onClick={() => router.push("/user/setting")}
                          className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                        >
                          <span>Setting</span>
                        </span>

                        <span
                          onClick={handleLogout}
                          className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                        >
                          <span>Logout</span>
                        </span>

                      </li>
                    ) : (
                      /* ADMIN */
                      <li className="flex flex-col text-gray-700 w-48 shadow-lg list-none">

                        <span
                          onClick={() =>
                            router.push("/admin/dashboard")
                          }
                          className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                        >
                          <span>Admin Panel</span>
                        </span>

                        <span
                          onClick={handleLogout}
                          className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                        >
                          <span>Logout</span>
                        </span>

                      </li>
                    )}

                  </div>
                </div>
              </Fragment>
            ) : (
              /* Login */
              <div
                onClick={loginModalOpen}
                className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-lg"
                title="Login"
              >
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            )}

            {/* Cart */}
            <div
              onClick={cartModalOpen}
              className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer"
              title="Cart"
            >
              <svg
                className="w-8 h-8 text-gray-600 hover:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              <span className="absolute top-0 ml-6 mt-1 bg-yellow-700 rounded px-1 text-white text-xs hover:text-gray-200 font-semibold">
                {data.cartProduct !== null
                  ? data.cartProduct.length
                  : 0}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={
            data.navberHamburger
              ? "px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
              : "hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
          }
        >
          <div className="col-span-1 flex flex-col text-gray-600">

            <span
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={() => router.push("/")}
            >
              Shop
            </span>

            <span
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={() => router.push("/blog")}
            >
              Blog
            </span>

            <span
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={() => router.push("/contact-us")}
            >
              Contact us
            </span>

          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navber;