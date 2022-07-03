import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    type: "",
    taskNumber: "",
    department: "",
    user: "",
    equipment: "",
    status: "",
    files: [],
};

const taskSlice = createSlice({
    name: "taskReducer",
    initialState,
    reducers: {
        getTaskSuccess: (state, action) => {
            state.type = action.payload.type;
            state.taskNumber = action.payload.taskNumber;
            state.department = action.payload.department;
            state.user = action.payload.user;
            state.equipment = action.payload.equipment;
            state.status = action.payload.status;
            state.files = action.payload.files;
        },
        getTaskFail: (state) => {
            state.type = "";
            state.taskNumber = "";
            state.department = "";
            state.user = "";
            state.equipment = "";
            state.status = "";
            state.files = [];
        },
        createTaskSuccess: (state, action) => {
            state.type = "";
            state.taskNumber = "";
            state.department = "";
            state.user = "";
            state.equipment = "";
            state.status = "";
            state.files = [];
        },
        createTaskFail: (state) => {
            state.type = "";
            state.taskNumber = "";
            state.department = "";
            state.user = "";
            state.equipment = "";
            state.status = "";
            state.files = [];
        },
        updateTaskSuccess: (state, action) => {
            state.type = action.payload.type;
            state.taskNumber = action.payload.taskNumber;
            state.department = action.payload.department;
            state.user = action.payload.user;
            state.equipment = action.payload.equipment;
            state.status = action.payload.status;
            state.files = action.payload.files;
        },
        updateTaskFail: (state) => {
            state.type = "";
            state.taskNumber = "";
            state.department = "";
            state.user = "";
            state.equipment = "";
            state.status = "";
            state.files = [];
        },
        deleteTaskSuccess: (state, action) => {
            state.type = "";
            state.taskNumber = "";
            state.department = "";
            state.user = "";
            state.equipment = "";
            state.status = "";
            state.files = [];
        },
        deleteTaskFail: (state) => {
            state.type = "";
            state.taskNumber = "";
            state.department = "";
            state.user = "";
            state.equipment = "";
            state.status = "";
            state.files = [];
        },
    },
});

export const getTaskCrt = (taskId) => async (dispatch) => {
    await axios
        .get(`${process.env.REACT_APP_API_URL_SERVER}/tasks/${taskId}`)
        .then((r) => {
            dispatch(getTaskSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(getTaskFail(e.response.data));
        });
};

export const createTaskCrt = (data) => async (dispatch) => {
    await axios
        .post(`${process.env.REACT_APP_API_URL_SERVER}/tasks`, data)
        .then((r) => {
            dispatch(createTaskSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(createTaskFail(e.response.data));
        });
};

export const updateTaskCrt = (taskId, data) => async (dispatch) => {
    await axios
        .put(`${process.env.REACT_APP_API_URL_SERVER}/tasks/${taskId}`, data)
        .then((r) => {
            dispatch(updateTaskSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(updateTaskFail(e.response.data));
        });
};

export const deleteTaskCrt = (taskId) => async (dispatch) => {
    await axios
        .delete(`${process.env.REACT_APP_API_URL_SERVER}/tasks/${taskId}`)
        .then((r) => {
            dispatch(deleteTaskSuccess(r.data.data));
        })
        .catch((e) => {
            console.log(e);
            dispatch(deleteTaskFail(e.response.data));
        });
};

export const {
    getTaskSuccess,
    getTaskFail,
    createTaskSuccess,
    createTaskFail,
    updateTaskSuccess,
    updateTaskFail,
    deleteTaskSuccess,
    deleteTaskFail,
} = taskSlice.actions;

export default taskSlice.reducer;
