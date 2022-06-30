import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    name: "",
    description: "",
};

const equipmentTypeSlice = createSlice({
    name: "equipmentTypeReducer",
    initialState,
    reducers: {
        getEquipmentTypeSuccess: (state, action) => {
            state.name = action.payload.name;
            state.description = action.payload.description;
        },
        getEquipmentTypeFail: (state) => {
            state.name = "";
            state.description = "";
        },
        createEquipmentTypeSuccess: (state, action) => {
            state.name = action.payload.name;
            state.description = action.payload.description;
        },
        createEquipmentTypeFail: (state) => {
            state.name = "";
            state.description = "";
        },
        updateEquipmentTypeSuccess: (state, action) => {
            state.name = action.payload.name;
            state.description = action.payload.description;
        },
        updateEquipmentTypeFail: (state) => {
            state.name = "";
            state.description = "";
        },
        deleteEquipmentTypeSuccess: (state, action) => {
            state.name = action.payload.name;
            state.description = action.payload.description;
        },
        deleteEquipmentTypeFail: (state) => {
            state.name = "";
            state.description = "";
        },
    },
});

export const getEquipmentTypeCrt = (equipmentTypeId) => async (dispatch) => {
    await axios
        .get(
            `${process.env.REACT_APP_API_URL_SERVER}/equipmenttypes/${equipmentTypeId}`
        )
        .then((r) => {
            dispatch(getEquipmentTypeSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getEquipmentTypeFail(e.response.data));
        });
};

export const createEquipmentTypeCrt = (data) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/equipmenttypes`, data)
        .then((r) => {
            dispatch(createEquipmentTypeSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(createEquipmentTypeFail(e.response.data));
        });
};

export const updateEquipmentTypeCrt =
    (equipmentTypeId, data) => async (dispatch) => {
        await axios
            .put(
                `${process.env.REACT_APP_API_URL_SERVER}/equipmenttypes/${equipmentTypeId}`,
                data
            )
            .then((r) => {
                dispatch(updateEquipmentTypeSuccess(r.data.data));
            })
            .catch((e) => {
                console.log(e);
                dispatch(updateEquipmentTypeFail(e.response.data));
            });
    };

export const deleteEquipmentTypeCrt = (equipmentTypeId) => async (dispatch) => {
    await axios
        .delete(
            `${process.env.REACT_APP_API_URL_SERVER}/equipmenttypes/${equipmentTypeId}`
        )
        .then((r) => {
            dispatch(deleteEquipmentTypeSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(deleteEquipmentTypeFail(e.response.data));
        });
};

export const {
    getEquipmentTypeSuccess,
    getEquipmentTypeFail,
    createEquipmentTypeSuccess,
    createEquipmentTypeFail,
    updateEquipmentTypeSuccess,
    updateEquipmentTypeFail,
    deleteEquipmentTypeSuccess,
    deleteEquipmentTypeFail,
} = equipmentTypeSlice.actions;

export default equipmentTypeSlice.reducer;
