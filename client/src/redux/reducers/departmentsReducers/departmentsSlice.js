import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
};

const departmentsSlice = createSlice({
    name: "departmentsReducer",
    initialState,
    reducers: {
        getDepartmentsSuccess: (state, action) => {
            state.data = action.payload;
        },
        getDepartmentsFail: (state) => {
            state.data = [];
        },
    },
});

export const getDepartmentsCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/departments`)
        .then((r) => dispatch(getDepartmentsSuccess(r.data.data)))
        .catch((e) => dispatch(getDepartmentsFail(e.response.data)));
};

export const { getDepartmentsSuccess, getDepartmentsFail } =
    departmentsSlice.actions;

export default departmentsSlice.reducer;
