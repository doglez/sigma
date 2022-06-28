import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    statesProvinces: [],
};

const statesProvincesSlice = createSlice({
    name: "statesProvincesReducer",
    initialState,
    reducers: {
        statesProvincesSuccess: (state, action) => {
            state.statesProvinces = action.payload;
        },
        statesProvincesFail: (state) => {
            state.statesProvinces = [];
        },
    },
});

export const StatesProvincesCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_COUNTRYSTATE}/states`, {
            headers: {
                Accept: "application/json",
                "X-CSCAPI-KEY": process.env.REACT_APP_API_TOKEN,
                Authorization: `Bearer ${process.env.REACT_APP_API_URL_COUNTRYSTATE}`,
            },
        })
        .then((r) => dispatch(statesProvincesSuccess(r.data)))
        .catch((e) => dispatch(statesProvincesFail(e.data)));
};

export const { statesProvincesSuccess, statesProvincesFail } =
    statesProvincesSlice.actions;

export default statesProvincesSlice.reducer;
