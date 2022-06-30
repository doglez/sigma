import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    departmentNumber: "",
    name: "",
    email: "",
};

const departmentSlice = createSlice({
    name: "departmentReducer",
    initialState,
    reducers: {
        getDepartmentSuccess: (state, action) => {
            state.departmentNumber = action.payload.departmentNumber;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        getDepartmentFail: (state) => {
            state.departmentNumber = "";
            state.name = "";
            state.email = "";
        },
        createDepartmentSuccess: (state, action) => {
            state.departmentNumber = action.payload.departmentNumber;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        createDepartmentFail: (state) => {
            state.departmentNumber = "";
            state.name = "";
            state.email = "";
        },
        updateDepartmentSuccess: (state, action) => {
            state.departmentNumber = action.payload.departmentNumber;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        updateDepartmentFail: (state) => {
            state.departmentNumber = "";
            state.name = "";
            state.email = "";
        },
        deleteDepartmentSuccess: (state, action) => {
            state.departmentNumber = action.payload.departmentNumber;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        deleteDepartmentFail: (state) => {
            state.departmentNumber = "";
            state.name = "";
            state.email = "";
        },
    },
});

export const getDepartmentCrt = (departmentId) => async (dispatch) => {
    await axios
        .get(
            `${process.env.REACT_APP_API_URL_SERVER}/departments/${departmentId}`
        )
        .then((r) => {
            dispatch(getDepartmentSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getDepartmentFail(e.response.data));
        });
};

export const createDepartmentCrt = (data) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/departments`, data)
        .then((r) => {
            dispatch(createDepartmentSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(createDepartmentFail(e.response.data));
        });
};

export const updateDepartmentCrt = (departmentId, data) => async (dispatch) => {
    await axios
        .put(
            `${process.env.REACT_APP_API_URL_SERVER}/departments/${departmentId}`,
            data
        )
        .then((r) => {
            dispatch(updateDepartmentSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(updateDepartmentFail(e.response.data));
        });
};

export const deleteDepartmentCrt = (departmentId) => async (dispatch) => {
    await axios
        .delete(
            `${process.env.REACT_APP_API_URL_SERVER}/departments/${departmentId}`
        )
        .then((r) => {
            dispatch(deleteDepartmentSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(deleteDepartmentFail(e.response.data));
        });
};

export const {
    getDepartmentSuccess,
    getDepartmentFail,
    createDepartmentSuccess,
    createDepartmentFail,
    updateDepartmentSuccess,
    updateDepartmentFail,
    deleteDepartmentSuccess,
    deleteDepartmentFail,
} = departmentSlice.actions;

export default departmentSlice.reducer;
