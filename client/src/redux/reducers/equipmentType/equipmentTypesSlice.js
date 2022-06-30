import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
};

const equipmentTypesSlice = createSlice({
    name: "equipmentTypesReducer",
    initialState,
    reducers: {
        getEquipmentTypesSuccess: (state, action) => {
            state.data = action.payload;
        },
        getEquipmentTypesFail: (state) => {
            state.data = [];
        },
    },
});

export const getEquipmentTypesCrt = () => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/equipmenttypes?sort=name`)
        .then((r) => dispatch(getEquipmentTypesSuccess(r.data.data)))
        .catch((e) => dispatch(getEquipmentTypesFail(e.response.data)));
};

export const { getEquipmentTypesSuccess, getEquipmentTypesFail } =
    equipmentTypesSlice.actions;

export default equipmentTypesSlice.reducer;
