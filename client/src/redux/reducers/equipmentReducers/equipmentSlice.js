import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    inventoryNumber: "",
    name: "",
    brand: "",
    model: "",
    serial: "",
    equipmentType: "",
    provider: "",
    department: "",
    installDate: "",
    usableLife: "",
};

const equipmentSlice = createSlice({
    name: "equipmentReducer",
    initialState,
    reducers: {
        getEquipmentSuccess: (state, action) => {
            state.inventoryNumber = action.payload.inventoryNumber;
            state.name = action.payload.name;
            state.brand = action.payload.brand;
            state.model = action.payload.model;
            state.serial = action.payload.serial;
            state.equipmentType = action.payload.equipmentType;
            state.provider = action.payload.provider;
            state.department = action.payload.department;
            state.installDate = action.payload.installDate;
            state.usableLife = action.payload.usableLife;
        },
        getEquipmentFail: (state) => {
            state.inventoryNumber = "";
            state.name = "";
            state.brand = "";
            state.model = "";
            state.serial = "";
            state.equipmentType = "";
            state.provider = "";
            state.department = "";
            state.installDate = "";
            state.usableLife = "";
        },
        createEquipmentSuccess: (state, action) => {
            state.inventoryNumber = action.payload.inventoryNumber;
            state.name = action.payload.name;
            state.brand = action.payload.brand;
            state.model = action.payload.model;
            state.serial = action.payload.serial;
            state.equipmentType = action.payload.equipmentType;
            state.provider = action.payload.provider;
            state.department = action.payload.department;
            state.installDate = action.payload.installDate;
            state.usableLife = action.payload.usableLife;
        },
        createEquipmentFail: (state) => {
            state.inventoryNumber = "";
            state.name = "";
            state.brand = "";
            state.model = "";
            state.serial = "";
            state.equipmentType = "";
            state.provider = "";
            state.department = "";
            state.installDate = "";
            state.usableLife = "";
        },
        updateEquipmentSuccess: (state) => {
            state.inventoryNumber = "";
            state.name = "";
            state.brand = "";
            state.model = "";
            state.serial = "";
            state.equipmentType = "";
            state.provider = "";
            state.department = "";
            state.installDate = "";
            state.usableLife = "";
        },
        updateEquipmentFail: (state) => {
            state.inventoryNumber = "";
            state.name = "";
            state.brand = "";
            state.model = "";
            state.serial = "";
            state.equipmentType = "";
            state.provider = "";
            state.department = "";
            state.installDate = "";
            state.usableLife = "";
        },
        deleteEquipmentSuccess: (state) => {
            state.inventoryNumber = "";
            state.name = "";
            state.brand = "";
            state.model = "";
            state.serial = "";
            state.equipmentType = "";
            state.provider = "";
            state.department = "";
            state.installDate = "";
            state.usableLife = "";
        },
        deleteEquipmentFail: (state) => {
            state.inventoryNumber = "";
            state.name = "";
            state.brand = "";
            state.model = "";
            state.serial = "";
            state.equipmentType = "";
            state.provider = "";
            state.department = "";
            state.installDate = "";
            state.usableLife = "";
        },
    },
});

export const getEquipmentCrt = (equipmentId) => async (dispatch) => {
    await axios
        .get(
            `${process.env.REACT_APP_API_URL_SERVER}/equipments/${equipmentId}`
        )
        .then((r) => {
            dispatch(getEquipmentSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getEquipmentFail(e.response.data));
        });
};

export const createEquipmentCrt = (data) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/equipments`, data)
        .then((r) => {
            dispatch(createEquipmentSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(createEquipmentFail(e.response.data));
        });
};

export const updateEquipmentCrt = (equipmentId, data) => async (dispatch) => {
    await axios
        .put(
            `${process.env.REACT_APP_API_URL_SERVER}/equipments/${equipmentId}`,
            data
        )
        .then((r) => {
            dispatch(updateEquipmentSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(updateEquipmentFail(e.response.data));
        });
};

export const deleteEquipmentCrt = (equipmentId) => async (dispatch) => {
    await axios
        .delete(
            `${process.env.REACT_APP_API_URL_SERVER}/equipments/${equipmentId}`
        )
        .then((r) => {
            dispatch(deleteEquipmentSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(deleteEquipmentFail(e.response.data));
        });
};

export const {
    getEquipmentSuccess,
    getEquipmentFail,
    createEquipmentSuccess,
    createEquipmentFail,
    updateEquipmentSuccess,
    updateEquipmentFail,
    deleteEquipmentSuccess,
    deleteEquipmentFail,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
