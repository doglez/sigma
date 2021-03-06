import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    id: "",
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

const myInfoSlice = createSlice({
    name: "myInfoReducer",
    initialState,
    reducers: {
        myInfoSuccess: (state, action) => {
            state.id = action.payload._id;
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
        myInfoFail: (state) => {
            state.id = "";
            state.collaboratorNumber = "";
            state.name = "";
            state.lastName = "";
            state.country = " ";
            state.stateProvince = "";
            state.phone = "";
            state.email = "";
            state.role = "";
            state.department = "";
            state.photo = "";
        },
    },
});

export const getMyInfoCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/auth/me`)
        .then((r) => {
            dispatch(myInfoSuccess(r.data.data));
        })
        .catch((e) => dispatch(myInfoFail(e.response.data)));
};

export const { myInfoSuccess, myInfoFail } = myInfoSlice.actions;

export default myInfoSlice.reducer;
