import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    countries: [],
};

const countriesSlice = createSlice({
    name: "countriesReducer",
    initialState,
    reducers: {
        countriesSuccess: (state, action) => {
            state.countries = action.payload;
        },
        countriesFail: (state) => {
            state.countries = [];
        },
    },
});

export const CountriesCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_COUNTRYSTATE}/countries`, {
            headers: {
                Accept: "application/json",
                "X-CSCAPI-KEY": process.env.REACT_APP_API_TOKEN,
                Authorization: `Bearer ${process.env.REACT_APP_API_URL_COUNTRYSTATE}`,
            },
        })
        .then((r) => dispatch(countriesSuccess(r.data)))
        .catch((e) => dispatch(countriesFail(e.data)));
};

export const { countriesSuccess, countriesFail } = countriesSlice.actions;

export default countriesSlice.reducer;
