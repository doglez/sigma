import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
};

const agreementsSlice = createSlice({
    name: "agreementsReducer",
    initialState,
    reducers: {
        getAgreementsSuccess: (state, action) => {
            state.data = action.payload;
        },
        getAgreementsFail: (state) => {
            state.data = [];
        },
    },
});

export const getAgreementsCrt = () => async (dispatch) => {
    await axios
        .get(
            `${process.env.REACT_APP_API_URL_SERVER}/agreements?sort=agreementNumber`
        )
        .then((r) => dispatch(getAgreementsSuccess(r.data.data)))
        .catch((e) => dispatch(getAgreementsFail(e.response.data)));
};

export const { getAgreementsSuccess, getAgreementsFail } =
    agreementsSlice.actions;

export default agreementsSlice.reducer;
