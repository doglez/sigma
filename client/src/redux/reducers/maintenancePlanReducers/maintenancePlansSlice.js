import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
};

const maintenancePlansSlice = createSlice({
    name: "maintenancePlansReducer",
    initialState,
    reducers: {
        getMaintenancePlansSuccess: (state, action) => {
            state.data = action.payload;
        },
        getMaintenancePlansFail: (state) => {
            state.data = [];
        },
    },
});

export const getMaintenancePlansCrt = () => async (dispatch) => {
    await axios
        .get(
            `${process.env.REACT_APP_API_URL_SERVER}/maintenanceplans?sort=name`
        )
        .then((r) => dispatch(getMaintenancePlansSuccess(r.data.data)))
        .catch((e) => dispatch(getMaintenancePlansFail(e.response.data)));
};

export const { getMaintenancePlansSuccess, getMaintenancePlansFail } =
    maintenancePlansSlice.actions;

export default maintenancePlansSlice.reducer;
