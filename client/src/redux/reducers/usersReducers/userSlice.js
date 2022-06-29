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
    photo: "",
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
            state.photo = action.payload.photo;
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
            state.photo = "";
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
            state.photo = action.payload.photo;
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
            state.photo = "";
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
            state.photo = action.payload.photo;
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
            state.photo = "";
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
            state.photo = "";
        },
    },
});

export const getUserCrt = (userId) => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/users/${userId}`)
        .then((r) => {
            dispatch(getUserSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getUserFail(e.response.data));
        });
};

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

export const updateUserCrt = (userId, data) => async (dispatch) => {
    await axios
        .put(`${process.env.REACT_APP_API_URL_SERVER}/users/${userId}`, data)
        .then((r) => {
            dispatch(updateUserSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(updateUserFail(e.response.data));
        });
};

export const {
    getUserSuccess,
    getUserFail,
    createUserSuccess,
    createUserFail,
    updateUserSuccess,
    updateUserFail,
} = userSlice.actions;

export default userSlice.reducer;
