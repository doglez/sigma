import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    name: "",
    address: "",
    zipCode: "",
    country: "",
    stateProvince: "",
    currency: "",
    phone: "",
    email: "",
    website: "",
    logo: "",
};

const companySlice = createSlice({
    name: "companyReducer",
    initialState,
    reducers: {
        getCompanySuccess: (state, action) => {
            state.name = action.payload.name;
            state.address = action.payload.address;
            state.zipCode = action.payload.zipCode;
            state.country = action.payload.country;
            state.stateProvince = action.payload.stateProvince;
            state.currency = action.payload.currency;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.website = action.payload.website;
            state.logo = action.payload.logo;
        },
        getCompanyFail: (state) => {
            state.name = "";
            state.address = "";
            state.zipCode = "";
            state.country = "";
            state.stateProvince = "";
            state.currency = "";
            state.phone = "";
            state.email = "";
            state.website = "";
            state.logo = "";
        },
    },
});

export const CompanyCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/company`)
        .then((r) => dispatch(getCompanySuccess(r.data.data[0])))
        .catch((e) => dispatch(getCompanyFail(e.response.data)));
};

export const { getCompanySuccess, getCompanyFail } = companySlice.actions;

export default companySlice.reducer;
