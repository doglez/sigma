import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice.js";
import myInfoSlice from "./reducers/myInfoSlice.js";
import companySlice from "./reducers/companySlice.js";
import coutriesSlice from "./reducers/coutriesSlice.js";

let store = configureStore({
    reducer: {
        authReducer: authSlice,
        myInfoReducer: myInfoSlice,
        companyReducer: companySlice,
        coutriesReducer: coutriesSlice,
    },
    middleware: [thunk],
});

export default store;
