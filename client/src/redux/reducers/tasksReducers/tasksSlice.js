import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
};

const tasksSlice = createSlice({
    name: "tasksReducer",
    initialState,
    reducers: {
        getTasksSuccess: (state, action) => {
            state.data = action.payload;
        },
        getTasksFail: (state) => {
            state.data = [];
        },
    },
});

export const getTasksCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/tasks?sort=ein`)
        .then((r) => dispatch(getTasksSuccess(r.data.data)))
        .catch((e) => dispatch(getTasksFail(e.response.data)));
};

export const { getTasksSuccess, getTasksFail } = tasksSlice.actions;

export default tasksSlice.reducer;
