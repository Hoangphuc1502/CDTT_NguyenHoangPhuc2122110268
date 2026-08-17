"use client";

import React, {
  Fragment,
  createContext,
  useReducer,
} from "react";

import { Navber, Footer, CartModal } from "../partials";
import LoginSignup from "../auth/LoginSignup";

import {
  layoutState,
  layoutReducer,
} from "./layoutContext";

export const LayoutContext = createContext();

export default function Layout({ children }) {
  const [data, dispatch] = useReducer(
    layoutReducer,
    layoutState
  );

  return (
    <Fragment>
      <LayoutContext.Provider value={{ data, dispatch }}>
        <div className="flex-grow">
          <Navber />
          <LoginSignup />
          <CartModal />

          {children}
        </div>

        <Footer />
      </LayoutContext.Provider>
    </Fragment>
  );
}