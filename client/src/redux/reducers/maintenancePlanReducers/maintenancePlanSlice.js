import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    year: "",
    name: "",
    frequency: "",
    department: "",
    agreements: [],
    equipments: [],
};

const maintenancePlanSlice = createSlice({
    name: "maintenancePlanReducer",
    initialState,
    reducers: {
        getMaintenancePlanSuccess: (state, action) => {
            state.year = action.payload.year;
            state.name = action.payload.name;
            state.frequency = action.payload.frequency;
            state.department = action.payload.department;
            state.agreements = action.payload.agreements;
            state.equipments = action.payload.equipments;
        },
        getMaintenancePlanFail: (state) => {
            state.year = "";
            state.name = "";
            state.frequency = "";
            state.department = "";
            state.agreements = [];
            state.equipments = [];
        },
        createMaintenancePlanSuccess: (state, action) => {
            state.year = "";
            state.name = "";
            state.frequency = "";
            state.department = "";
            state.agreements = [];
            state.equipments = [];
        },
        createMaintenancePlanFail: (state) => {
            state.year = "";
            state.name = "";
            state.frequency = "";
            state.department = "";
            state.agreements = [];
            state.equipments = [];
        },
        updateMaintenancePlanSuccess: (state, action) => {
            state.year = "";
            state.name = "";
            state.frequency = "";
            state.department = "";
            state.agreements = [];
            state.equipments = [];
        },
        updateMaintenancePlanFail: (state) => {
            state.year = "";
            state.name = "";
            state.frequency = "";
            state.department = "";
            state.agreements = [];
            state.equipments = [];
        },
        deleteMaintenancePlanSuccess: (state, action) => {
            state.year = "";
            state.name = "";
            state.frequency = "";
            state.department = "";
            state.agreements = [];
            state.equipments = [];
        },
        deleteMaintenancePlanFail: (state) => {
            state.year = "";
            state.name = "";
            state.frequency = "";
            state.department = "";
            state.agreements = [];
            state.equipments = [];
        },
    },
});

export const getMaintenancePlanCrt =
    (maintenancePlanId) => async (dispatch) => {
        await axios
            .get(
                `${process.env.REACT_APP_API_URL_SERVER}/maintenanceplans/${maintenancePlanId}`
            )
            .then((r) => {
                dispatch(getMaintenancePlanSuccess(r.data.data));
            })
            .catch((e) => {
                console.log(e);
                dispatch(getMaintenancePlanFail(e.response.data));
            });
    };

export const createMaintenancePlanCrt = (data) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/maintenanceplans`, data)
        .then((r) => {
            dispatch(createMaintenancePlanSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(createMaintenancePlanFail(e.response.data));
        });
};

export const updateMaintenancePlanCrt =
    (maintenancePlanId, data) => async (dispatch) => {
        await axios
            .put(
                `${process.env.REACT_APP_API_URL_SERVER}/maintenanceplans/${maintenancePlanId}`,
                data
            )
            .then((r) => {
                dispatch(updateMaintenancePlanSuccess(r.data.data));
            })
            .catch((e) => {
                console.log(e);
                dispatch(updateMaintenancePlanFail(e.response.data));
            });
    };

export const deleteMaintenancePlanCrt =
    (maintenancePlanId) => async (dispatch) => {
        await axios
            .delete(
                `${process.env.REACT_APP_API_URL_SERVER}/maintenanceplans/${maintenancePlanId}`
            )
            .then((r) => {
                dispatch(deleteMaintenancePlanSuccess(r.data.data));
            })
            .catch((e) => {
                console.log(e);
                dispatch(deleteMaintenancePlanFail(e.response.data));
            });
    };

export const {
    getMaintenancePlanSuccess,
    getMaintenancePlanFail,
    createMaintenancePlanSuccess,
    createMaintenancePlanFail,
    updateMaintenancePlanSuccess,
    updateMaintenancePlanFail,
    deleteMaintenancePlanSuccess,
    deleteMaintenancePlanFail,
} = maintenancePlanSlice.actions;

export default maintenancePlanSlice.reducer;
