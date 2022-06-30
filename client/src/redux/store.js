import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice.js";
import myInfoSlice from "./reducers/myInfoSlice.js";
import companySlice from "./reducers/companySlice.js";
import countriesSlice from "./reducers/countriesSlice.js";
import statesProvincesSlice from "./reducers/statesProvincesSlice.js";
import usersSlice from "./reducers/usersReducers/usersSlice.js";
import userSlice from "./reducers/usersReducers/userSlice.js";
import departmentsSlice from "./reducers/departmentsReducers/departmentsSlice.js";
import departmentSlice from "./reducers/departmentsReducers/departmentSlice.js";

let store = configureStore({
    reducer: {
        authReducer: authSlice,
        myInfoReducer: myInfoSlice,
        companyReducer: companySlice,
        countriesReducer: countriesSlice,
        statesProvincesReducer: statesProvincesSlice,
        usersReducer: usersSlice,
        userReducer: userSlice,
        departmentsReducer: departmentsSlice,
        departmentReducer: departmentSlice,
    },
    middleware: [thunk],
});

export default store;
