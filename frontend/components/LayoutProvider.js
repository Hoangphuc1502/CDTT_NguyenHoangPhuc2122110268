"use client";

import { useReducer } from "react";
import {
  LayoutContext,
  layoutReducer,
  layoutState,
} from "./shop";

export default function LayoutProvider({ children }) {
  const [data, dispatch] = useReducer(layoutReducer, layoutState);

  return (
    <LayoutContext.Provider value={{ data, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
}