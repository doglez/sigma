import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
};

const equipmentsSlice = createSlice({
    name: "equipmentsReducer",
    initialState,
    reducers: {
        getEquipmentsSuccess: (state, action) => {
            state.data = action.payload;
        },
        getEquipmentsFail: (state) => {
            state.data = [];
        },
    },
});

export const getEquipmentsCrt = () => async (dispatch) => {
    await axios
        .get(
            `${process.env.REACT_APP_API_URL_SERVER}/equipments?sort=inventoryNumber`
        )
        .then((r) => dispatch(getEquipmentsSuccess(r.data.data)))
        .catch((e) => dispatch(getEquipmentsFail(e.response.data)));
};

export const { getEquipmentsSuccess, getEquipmentsFail } =
    equipmentsSlice.actions;

export default equipmentsSlice.reducer;
