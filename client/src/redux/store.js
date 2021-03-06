import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice.js";
import myInfoSlice from "./reducers/myInfoSlice.js";
import companySlice from "./reducers/companySlice.js";
import countriesSlice from "./reducers/countriesSlice.js";
import statesProvincesSlice from "./reducers/statesProvincesSlice.js";
import usersSlice from "./reducers/usersReducers/usersSlice.js";
import userSlice from "./reducers/usersReducers/userSlice.js";
import departmentsSlice from "./reducers/departmentsReducers/departmentsSlice.js";
import departmentSlice from "./reducers/departmentsReducers/departmentSlice.js";
import providersSlice from "./reducers/providersReducers/providersSlice.js";
import providerSlice from "./reducers/providersReducers/providerSlice.js";
import equipmentTypesSlice from "./reducers/equipmentTypeReducers/equipmentTypesSlice.js";
import equipmentTypeSlice from "./reducers/equipmentTypeReducers/equipmentTypeSlice.js";
import equipmentsSlice from "./reducers/equipmentReducers/equipmentsSlice.js";
import equipmentSlice from "./reducers/equipmentReducers/equipmentSlice.js";
import agreementsSlice from "./reducers/agreementReducers/agreementsSlice.js";
import agreementSlice from "./reducers/agreementReducers/agreementSlice.js";
import tasksSlice from "./reducers/tasksReducers/tasksSlice.js";
import taskSlice from "./reducers/tasksReducers/taskSlice.js";
import maintenancePlansSlice from "./reducers/maintenancePlanReducers/maintenancePlansSlice.js";
import maintenancePlanSlice from "./reducers/maintenancePlanReducers/maintenancePlanSlice.js";
import filteredTasksSlice from "./reducers/tasksReducers/filteredTasksSlice.js";

let store = configureStore({
    reducer: {
        authReducer: authSlice,
        myInfoReducer: myInfoSlice,
        companyReducer: companySlice,
        countriesReducer: countriesSlice,
        statesProvincesReducer: statesProvincesSlice,
        usersReducer: usersSlice,
        userReducer: userSlice,
        departmentsReducer: departmentsSlice,
        departmentReducer: departmentSlice,
        providersReducer: providersSlice,
        providerReducer: providerSlice,
        equipmentTypesReducer: equipmentTypesSlice,
        equipmentTypeReducer: equipmentTypeSlice,
        equipmentsReducer: equipmentsSlice,
        equipmentReducer: equipmentSlice,
        agreementsReducer: agreementsSlice,
        agreementReducer: agreementSlice,
        tasksReducer: tasksSlice,
        taskReducer: taskSlice,
        filteredTasksReducer: filteredTasksSlice,
        maintenancePlansReducer: maintenancePlansSlice,
        maintenancePlanReducer: maintenancePlanSlice,
    },
    middleware: [thunk],
});

export default store;
