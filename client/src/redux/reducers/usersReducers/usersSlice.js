import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
};

const usersSlice = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        getUsersSuccess: (state, action) => {
            state.data = action.payload;
        },
        getUsersFail: (state) => {
            state.data = [];
        },
    },
});

export const getUserCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/users`)
        .then((r) => dispatch(getUsersSuccess(r.data.data)))
        .catch((e) => dispatch(getUsersFail(e.response.data)));
};

export const { getUsersSuccess, getUsersFail } = usersSlice.actions;

export default usersSlice.reducer;
