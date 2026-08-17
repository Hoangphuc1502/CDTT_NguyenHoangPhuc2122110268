"use client";

import { useReducer } from "react";

import {
  LayoutContext,
  layoutReducer,
  layoutState,
} from "./shop";

import { Navber, Footer, CartModal } from "./shop/partials";
import LoginSignup from "./shop/auth/LoginSignup";

export default function LayoutProvider({ children }) {
  const [data, dispatch] = useReducer(
    layoutReducer,
    layoutState
  );

  return (
    <LayoutContext.Provider value={{ data, dispatch }}>
      <div className="flex-grow">
        <Navber />

        <LoginSignup />

        <CartModal />

        {children}
      </div>

      <Footer />
    </LayoutContext.Provider>
  );
}