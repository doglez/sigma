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
};

const myInfoSlice = createSlice({
    name: "myInfoReducer",
    initialState,
    reducers: {
        myInfoSucces: (state, action) => {
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
        },
    },
});

export const MyInfoCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/auth/me`)
        .then((r) => {
            dispatch(myInfoSucces(r.data.data));
        })
        .catch((e) => dispatch(myInfoFail(e.response.data)));
};

export const { myInfoSucces, myInfoFail } = myInfoSlice.actions;

export default myInfoSlice.reducer;
