import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    countries: [],
};

const coutriesSlice = createSlice({
    name: "coutriesReducer",
    initialState,
    reducers: {
        coutriesSuccess: (state, action) => {
            state.countries = action.payload;
        },
        coutriesFail: (state) => {
            state.countries = [];
        },
    },
});

export const CoutriesCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_COUNTRYSTATE}/countries`, {
            headers: {
                Accept: "application/json",
                "X-CSCAPI-KEY": process.env.REACT_APP_API_TOKEN,
                Authorization: `Bearer ${process.env.REACT_APP_API_URL_COUNTRYSTATE}`,
            },
        })
        .then((r) => dispatch(coutriesSuccess(r.data)))
        .catch((e) => dispatch(coutriesFail(e.data)));
};

export const { coutriesSuccess, coutriesFail } = coutriesSlice.actions;

export default coutriesSlice.reducer;
