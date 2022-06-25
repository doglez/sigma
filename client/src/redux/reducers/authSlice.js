import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authUrl = `${process.env.REACT_APP_API_URL_SERVER}/${process.env.REACT_APP_API_URL_SERVER_VERSION}/auth/login`;

const initialState = {
    success: false,
    token: "",
    error: "",
};

const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.success = action.payload.success;
            state.token = action.payload.token;
            state.error = "";
        },
        loginFail: (state, action) => {
            state.success = action.payload.success;
            state.token = "";
            state.error = action.payload.error;
        },
    },
});

export const LoginCrt = (loginData) => async (dispatch) => {
    await axios
        .post(authUrl, loginData)
        .then((r) => {
            // window.location.reload();
            dispatch(loginSuccess(r.data));
        })
        .catch((e) => {
            dispatch(loginFail(e.response.data));
        });
};

export const { loginSuccess, loginFail } = authSlice.actions;

export default authSlice.reducer;
