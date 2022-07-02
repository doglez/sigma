import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    agreementNumber: "",
    reference: "",
    provider: "",
    department: "",
    startDate: "",
    expDate: "",
    equipments: [],
    files: [],
};

const agreementSlice = createSlice({
    name: "agreementReducer",
    initialState,
    reducers: {
        getAgreementSuccess: (state, action) => {
            state.agreementNumber = action.payload.agreementNumber;
            state.reference = action.payload.reference;
            state.provider = action.payload.provider;
            state.department = action.payload.department;
            state.startDate = action.payload.startDate;
            state.expDate = action.payload.expDate;
            state.equipments = [action.payload.equipments];
            state.files = [action.payload.files];
        },
        getAgreementFail: (state) => {
            state.agreementNumber = "";
            state.reference = "";
            state.provider = "";
            state.department = "";
            state.startDate = "";
            state.expDate = "";
            state.equipments = [];
            state.files = [];
        },
        createAgreementSuccess: (state, action) => {
            state.agreementNumber = action.payload.agreementNumber;
            state.reference = action.payload.reference;
            state.provider = action.payload.provider;
            state.department = action.payload.department;
            state.startDate = action.payload.startDate;
            state.expDate = action.payload.expDate;
            state.equipments = [action.payload.equipments];
            state.files = [action.payload.files];
        },
        createAgreementFail: (state) => {
            state.agreementNumber = "";
            state.reference = "";
            state.provider = "";
            state.department = "";
            state.startDate = "";
            state.expDate = "";
            state.equipments = [];
            state.files = [];
        },
        updateAgreementSuccess: (state, action) => {
            state.agreementNumber = "";
            state.reference = "";
            state.provider = "";
            state.department = "";
            state.startDate = "";
            state.expDate = "";
            state.equipments = [];
            state.files = [];
        },
        updateAgreementFail: (state) => {
            state.agreementNumber = "";
            state.reference = "";
            state.provider = "";
            state.department = "";
            state.startDate = "";
            state.expDate = "";
            state.equipments = [];
            state.files = [];
        },
        deleteAgreementSuccess: (state, action) => {
            state.agreementNumber = "";
            state.reference = "";
            state.provider = "";
            state.department = "";
            state.startDate = "";
            state.expDate = "";
            state.equipments = [];
            state.files = [];
        },
        deleteAgreementFail: (state) => {
            state.agreementNumber = "";
            state.reference = "";
            state.provider = "";
            state.department = "";
            state.startDate = "";
            state.expDate = "";
            state.equipments = [];
            state.files = [];
        },
    },
});

export const getAgreementCrt = (agreementId) => async (dispatch) => {
    await axios
        .get(
            `${process.env.REACT_APP_API_URL_SERVER}/agreements/${agreementId}`
        )
        .then((r) => {
            dispatch(getAgreementSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getAgreementFail(e.response.data));
        });
};

export const createAgreementCrt = (data) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/agreements`, data)
        .then((r) => {
            dispatch(createAgreementSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(createAgreementFail(e.response.data));
        });
};

export const updateAgreementCrt = (agreementId, data) => async (dispatch) => {
    await axios
        .put(
            `${process.env.REACT_APP_API_URL_SERVER}/agreements/${agreementId}`,
            data
        )
        .then((r) => {
            dispatch(updateAgreementSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(updateAgreementFail(e.response.data));
        });
};

export const deleteAgreementCrt = (agreementId) => async (dispatch) => {
    await axios
        .delete(
            `${process.env.REACT_APP_API_URL_SERVER}/agreements/${agreementId}`
        )
        .then((r) => {
            dispatch(deleteAgreementSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(deleteAgreementFail(e.response.data));
        });
};

export const {
    getAgreementSuccess,
    getAgreementFail,
    createAgreementSuccess,
    createAgreementFail,
    updateAgreementSuccess,
    updateAgreementFail,
    deleteAgreementSuccess,
    deleteAgreementFail,
} = agreementSlice.actions;

export default agreementSlice.reducer;
