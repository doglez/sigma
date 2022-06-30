import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
};

const providersSlice = createSlice({
    name: "providersReducer",
    initialState,
    reducers: {
        getProvidersSuccess: (state, action) => {
            state.data = action.payload;
        },
        getProvidersFail: (state) => {
            state.data = [];
        },
    },
});

export const getProvidersCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/providers?sort=ein`)
        .then((r) => dispatch(getProvidersSuccess(r.data.data)))
        .catch((e) => dispatch(getProvidersFail(e.response.data)));
};

export const { getProvidersSuccess, getProvidersFail } = providersSlice.actions;

export default providersSlice.reducer;
