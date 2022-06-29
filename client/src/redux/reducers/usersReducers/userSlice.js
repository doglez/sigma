import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    collaboratorNumber: "",
    name: "",
    lastName: "",
    country: "",
    stateProvince: "",
    phone: "",
    email: "",
    role: "",
    department: "",
};

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        getUserSuccess: (state, action) => {
            state.collaboratorNumber = action.payload.collaboratorNumber;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.country = action.payload.country;
            state.stateProvince = action.payload.stateProvince;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.department = action.payload.department;
        },
        getUserFail: (state) => {
            state.collaboratorNumber = "";
            state.name = "";
            state.lastName = "";
            state.country = "";
            state.stateProvince = "";
            state.phone = "";
            state.email = "";
            state.role = "";
            state.department = "";
        },
        createUserSuccess: (state, action) => {
            state.collaboratorNumber = action.payload.collaboratorNumber;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.country = action.payload.country;
            state.stateProvince = action.payload.stateProvince;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.department = action.payload.department;
        },
        createUserFail: (state) => {
            state.collaboratorNumber = "";
            state.name = "";
            state.lastName = "";
            state.country = "";
            state.stateProvince = "";
            state.phone = "";
            state.email = "";
            state.role = "";
            state.department = "";
        },
        updateUserSuccess: (state, action) => {
            state.collaboratorNumber = action.payload.collaboratorNumber;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.country = action.payload.country;
            state.stateProvince = action.payload.stateProvince;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.department = action.payload.department;
        },
        updateUserFail: (state) => {
            state.collaboratorNumber = "";
            state.name = "";
            state.lastName = "";
            state.country = "";
            state.stateProvince = "";
            state.phone = "";
            state.email = "";
            state.role = "";
            state.department = "";
        },
        deleteUserSuccess: (state, action) => {
            state.collaboratorNumber = action.payload.collaboratorNumber;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.country = action.payload.country;
            state.stateProvince = action.payload.stateProvince;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.department = action.payload.department;
        },
        deleteUserFail: (state) => {
            state.collaboratorNumber = "";
            state.name = "";
            state.lastName = "";
            state.country = "";
            state.stateProvince = "";
            state.phone = "";
            state.email = "";
            state.role = "";
            state.department = "";
        },
    },
});

export const createUserCrt = (data) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/users`, data)
        .then((r) => {
            dispatch(createUserSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(createUserFail(e.response.data));
        });
};

export const {
    getUserSuccess,
    getUserFail,
    createUserSuccess,
    createUserFail,
} = userSlice.actions;

export default userSlice.reducer;
