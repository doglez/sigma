import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice.js";
import myInfoSlice from "./reducers/myInfoSlice.js";

let store = configureStore({
    reducer: {
        authReducer: authSlice,
        myInfoReducer: myInfoSlice,
    },
    middleware: [thunk],
});

export default store;
