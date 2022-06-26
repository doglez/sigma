import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

let initialState = {
    token: "",
    error: "",
};

const getInitialState = () => {
    const auth = localStorage.getItem("auth");

    try {
        const token = JSON.parse(auth);
        const decode = jwtDecode(token);
        const expireToken = decode.exp;

        if (new Date(expireToken * 1000) > new Date()) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return { token, error: "" };
        }
        localStorage.removeItem("auth");
        return initialState;
    } catch (error) {
        // console.error(error);
        return initialState;
    }
};

const authSlice = createSlice({
    name: "authReducer",
    initialState: getInitialState(),
    reducers: {
        loginSuccess: (state, action) => {
            localStorage.setItem("auth", JSON.stringify(action.payload.token));
            axios.defaults.headers.post[
                "Authorization"
            ] = `Bearer ${action.payload.token}`;

            state.token = action.payload.token;
            state.error = "";
        },
        loginFail: (state, action) => {
            state.token = "";
            state.error = action.payload.error;
        },
        logoutSuccess: (state) => {
            state.token = "";
            state.error = "";
        },
        logoutFail: (state) => {
            state.token = "";
            state.error = "";
        },
    },
});

/**
 * @name LoginCrt
 * @description It make a post in the auth url and receive token
 * @param {email, password} loginData {email, password}
 * @returns Token
 */
export const LoginCrt = (loginData) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/auth/login`, loginData)
        .then((r) => {
            window.location.reload();
            dispatch(loginSuccess(r.data));
        })
        .catch((e) => {
            dispatch(loginFail(e.response.data));
            localStorage.removeItem("auth");
        });
};

/**
 * @name LogoutCrt
 * @description Logout from the app and delete token and local starogae
 * @param {email, password} loginData {email, password}
 * @returns Token
 */
export const LogoutCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/auth/logout`)
        .then((r) => {
            dispatch(logoutSuccess(r.data));
            localStorage.removeItem("auth");
        })
        .catch((e) => {
            dispatch(logoutFail(e.response.data));
            localStorage.removeItem("auth");
        });
};

export const { loginSuccess, loginFail, logoutSuccess, logoutFail } =
    authSlice.actions;

export default authSlice.reducer;
