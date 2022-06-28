import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice.js";
import myInfoSlice from "./reducers/myInfoSlice.js";
import companySlice from "./reducers/companySlice.js";
import countriesSlice from "./reducers/countriesSlice.js";
import statesProvincesSlice from "./reducers/statesProvincesSlice.js";

let store = configureStore({
    reducer: {
        authReducer: authSlice,
        myInfoReducer: myInfoSlice,
        companyReducer: companySlice,
        countriesReducer: countriesSlice,
        statesProvincesReducer: statesProvincesSlice,
    },
    middleware: [thunk],
});

export default store;
