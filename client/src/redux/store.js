import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice.js";

let store = configureStore({
    reducer: { authReducer: authSlice },
    middleware: [thunk],
});

export default store;
