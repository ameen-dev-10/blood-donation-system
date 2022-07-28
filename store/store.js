import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import { createWrapper } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  auth,
});

export const makeStore = () => configureStore({ reducer: combinedReducer });
export const wrapper = createWrapper(makeStore);
