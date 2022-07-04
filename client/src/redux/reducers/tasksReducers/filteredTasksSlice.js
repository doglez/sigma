import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    backlog: [],
    inProgress: [],
    done: [],
    cancel: [],
};

const filteredTasksSlice = createSlice({
    name: "filteredTasksReducer",
    initialState,
    reducers: {
        getFilteredTasksSuccess: (state, action) => {
            state.backlog = action.payload.backlog;
            state.inProgress = action.payload.inProgress;
            state.done = action.payload.done;
            state.cancel = action.payload.cancel;
        },
        getFilteredTasksFail: (state) => {
            state.backlog = [];
            state.inProgress = [];
            state.done = [];
            state.cancel = [];
        },
    },
});

export const getFilteredTaskCrt = (dept) => async (dispatch) => {
    let url;

    if (dept) {
        url = `${process.env.REACT_APP_API_URL_SERVER}/filteredtasks?dept=${dept}`;
    } else {
        url = `${process.env.REACT_APP_API_URL_SERVER}/filteredtasks`;
    }

    await axios
        .get(url)
        .then((r) => {
            dispatch(getFilteredTasksSuccess(r.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getFilteredTasksFail(e.response));
        });
};

export const { getFilteredTasksSuccess, getFilteredTasksFail } =
    filteredTasksSlice.actions;

export default filteredTasksSlice.reducer;
