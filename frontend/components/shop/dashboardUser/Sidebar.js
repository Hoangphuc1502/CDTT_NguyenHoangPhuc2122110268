"use client";

import React, { Fragment, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";

const Sidebar = () => {
  const { data } = useContext(DashboardUserContext);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <Fragment>
      <div className="flex flex-col w-full space-y-4 md:w-3/12 font-medium">
        {/* User information */}
        <div
          style={{ background: "#303031" }}
          className="flex items-center space-x-2 rounded shadow p-2 text-gray-100"
        >
          <svg
            className="cursor-pointer w-16 h-16 text-gray-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="flex flex-col w-full">
            <span className="text-sm">Hello,</span>

            <span className="text-lg">
              {data.userDetails ? data.userDetails.name : ""}
            </span>
          </div>
        </div>

        {/* Menu */}
        <div className="shadow hidden md:block w-full flex flex-col">
          {/* My Orders */}
          <div
            onClick={() => router.push("/user/orders")}
            className={`${
              pathname === "/user/orders"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Orders
          </div>

          <hr />

          {/* My Accounts */}
          <div
            onClick={() => router.push("/user/profile")}
            className={`${
              pathname === "/user/profile"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Accounts
          </div>

          <hr />

          {/* My Wishlist */}
          <div
            onClick={() => router.push("/wish-list")}
            className={`${
              pathname === "/wish-list"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Wishlist
          </div>

          <hr />

          {/* Setting */}
          <div
            onClick={() => router.push("/user/setting")}
            className={`${
              pathname === "/user/setting"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Setting
          </div>

          <hr />

          {/* Logout */}
          <div
            onClick={() => logout()}
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;