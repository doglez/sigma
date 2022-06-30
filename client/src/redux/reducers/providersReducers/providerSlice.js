import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    ein: "",
    name: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    logo: "",
};

const providerSlice = createSlice({
    name: "providerReducer",
    initialState,
    reducers: {
        getProviderSuccess: (state, action) => {
            state.ein = action.payload.ein;
            state.name = action.payload.name;
            state.country = action.payload.country;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.website = action.payload.website;
            state.logo = action.payload.logo;
        },
        getProviderFail: (state) => {
            state.ein = "";
            state.name = "";
            state.country = "";
            state.phone = "";
            state.email = "";
            state.website = "";
            state.logo = "";
        },
        createProviderSuccess: (state, action) => {
            state.ein = action.payload.ein;
            state.name = action.payload.name;
            state.country = action.payload.country;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.website = action.payload.website;
            state.logo = action.payload.logo;
        },
        createProviderFail: (state) => {
            state.ein = "";
            state.name = "";
            state.country = "";
            state.phone = "";
            state.email = "";
            state.website = "";
            state.logo = "";
        },
        updateProviderSuccess: (state, action) => {
            state.ein = action.payload.ein;
            state.name = action.payload.name;
            state.country = action.payload.country;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.website = action.payload.website;
            state.logo = action.payload.logo;
        },
        updateProviderFail: (state) => {
            state.ein = "";
            state.name = "";
            state.country = "";
            state.phone = "";
            state.email = "";
            state.website = "";
            state.logo = "";
        },
        deleteProviderSuccess: (state, action) => {
            state.ein = action.payload.ein;
            state.name = action.payload.name;
            state.country = action.payload.country;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.website = action.payload.website;
            state.logo = action.payload.logo;
        },
        deleteProviderFail: (state) => {
            state.ein = "";
            state.name = "";
            state.country = "";
            state.phone = "";
            state.email = "";
            state.website = "";
            state.logo = "";
        },
    },
});

export const getProviderCrt = (providerId) => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/providers/${providerId}`)
        .then((r) => {
            dispatch(getProviderSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getProviderFail(e.response.data));
        });
};

export const createProviderCrt = (data) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/providers`, data)
        .then((r) => {
            dispatch(createProviderSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(createProviderFail(e.response.data));
        });
};

export const updateProviderCrt = (providerId, data) => async (dispatch) => {
    await axios
        .put(
            `${process.env.REACT_APP_API_URL_SERVER}/providers/${providerId}`,
            data
        )
        .then((r) => {
            dispatch(updateProviderSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(updateProviderFail(e.response.data));
        });
};

export const deleteProviderCrt = (providerId) => async (dispatch) => {
    await axios
        .delete(
            `${process.env.REACT_APP_API_URL_SERVER}/providers/${providerId}`
        )
        .then((r) => {
            dispatch(deleteProviderSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(deleteProviderFail(e.response.data));
        });
};

export const {
    getProviderSuccess,
    getProviderFail,
    createProviderSuccess,
    createProviderFail,
    updateProviderSuccess,
    updateProviderFail,
    deleteProviderSuccess,
    deleteProviderFail,
} = providerSlice.actions;

export default providerSlice.reducer;
