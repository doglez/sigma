import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import Login from "./pages/Auth/Login.jsx";
import PasswordRecovery from "./pages/Auth/PasswordRecovery.jsx";
import Dashboard from "./pages/Home/Dashboard/Dashboard.jsx";
import Departments from "./pages/Home/Departments/Departments.jsx";
import Home from "./pages/Home/Home.jsx";
import SetupCompany from "./pages/Home/Setups/SetupCompany.jsx";
import SetupTheme from "./pages/Home/Setups/SetupTheme.jsx";
import Users from "./pages/Home/UserHome/Users.jsx";
import Inventory from "./pages/Inventory/Inventory.jsx";
import Maintenance from "./pages/Maintentance/Maintenance.jsx";
import Notifications from "./pages/Home/Notifications/Notifications.jsx";
import PersonalSettings from "./pages/PersonalSettings/PersonalSettings.jsx";
import Providers from "./pages/Providers/Providers.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NewUser from "./pages/Home/UserHome/NewUser.jsx";
import EditUser from "./pages/Home/UserHome/EditUser.jsx";
import DeleteUser from "./pages/Home/UserHome/DeleteUser.jsx";
import NewDepartments from "./pages/Home/Departments/NewDepartments.jsx";
import EditDepartments from "./pages/Home/Departments/EditDepartments.jsx";
import DeleteDepartments from "./pages/Home/Departments/DeleteDepartments.jsx";
import Task from "./pages/Home/Notifications/Task.jsx";
import MaintenancePlans from "./pages/Maintentance/MaintenancePlans/MaintenancePlans.jsx";
import NewPlan from "./pages/Maintentance/MaintenancePlans/NewPlan.jsx";
import EditPlan from "./pages/Maintentance/MaintenancePlans/EditPlan.jsx";
import DeletePlan from "./pages/Maintentance/MaintenancePlans/DeletePlan.jsx";
import KanbanBoard from "./pages/Maintentance/KanbanBoard/KanbanBoard.jsx";
import ProvidersList from "./pages/Providers/ProvidersInfo/ProvidersList.jsx";
import NewProvider from "./pages/Providers/ProvidersInfo/NewProvider.jsx";
import EditProvider from "./pages/Providers/ProvidersInfo/EditProvider.jsx";
import DeleteProvider from "./pages/Providers/ProvidersInfo/DeleteProvider.jsx";
import AgreementsList from "./pages/Providers/Agreements/AgreementsList.jsx";
import NewAgreement from "./pages/Providers/Agreements/NewAgreement.jsx";
import EditAgreement from "./pages/Providers/Agreements/EditAgreement.jsx";
import DeleteAgreement from "./pages/Providers/Agreements/DeleteAgreement.jsx";
import EquipmentList from "./pages/Inventory/Equipment/EquipmentList.jsx";
import NewEquipment from "./pages/Inventory/Equipment/NewEquipment.jsx";
import EditEquipment from "./pages/Inventory/Equipment/EditEquipment.jsx";
import DeleteEquipment from "./pages/Inventory/Equipment/DeleteEquipment.jsx";
import EquipmentTypeList from "./pages/Inventory/EquipmentType/EquipmentTypeList.jsx";
import NewEquipmentType from "./pages/Inventory/EquipmentType/NewEquipmentType.jsx";
import EditEquipmentType from "./pages/Inventory/EquipmentType/EditEquipmentType.jsx";
import DeleteEquipmentType from "./pages/Inventory/EquipmentType/DeleteEquipmentType.jsx";
import EditPassword from "./pages/PersonalSettings/EditPassword.jsx";
import EditMyInfo from "./pages/PersonalSettings/EditMyInfo.jsx";
import NavBar from "./pages/templates/NavBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import NoPermitPath from "./pages/NoPermitPath.jsx";
import { getMyInfoCrt } from "./redux/reducers/myInfoSlice.js";
import { CountriesCrt } from "./redux/reducers/countriesSlice.js";

function App() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.authReducer.token);
    if (token) {
        dispatch(getMyInfoCrt());
        dispatch(CountriesCrt());
    }
    const myRole = useSelector((state) => state.myInfoReducer.role);

    return (
        <BrowserRouter>
            <Routes>
                {!token ? (
                    <Route>
                        <Route
                            path="*"
                            element={<Navigate to="/login" replace />}
                        />
                        <Route path="/login">
                            <Route index element={<Login />} />
                            <Route
                                path="forgotpassword"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="passwordrecovery"
                                element={<PasswordRecovery />}
                            />
                        </Route>
                    </Route>
                ) : (
                    <Route>
                        <Route
                            path="/login/*"
                            element={<Navigate to="/home" replace />}
                        />
                        <Route
                            path="/login"
                            element={<Navigate to="/home" replace />}
                        />
                        <Route
                            path="/"
                            element={<Navigate to="/home" replace />}
                        />
                        <Route path="/" element={<NavBar />}>
                            <Route path="home" element={<Home />}>
                                <Route index element={<Dashboard />} />
                                {myRole === "super-admin" ? (
                                    <Route
                                        path="setupcompany"
                                        element={<SetupCompany />}
                                    />
                                ) : (
                                    <Route
                                        path="*"
                                        element={<NoPermitPath />}
                                    />
                                )}
                                <Route
                                    path="setuptheme"
                                    element={<SetupTheme />}
                                />
                                <Route path="users">
                                    <Route index element={<Users />} />
                                    {myRole === "super-admin" ||
                                    myRole === "admin" ||
                                    myRole === "chief" ? (
                                        <Route>
                                            <Route
                                                path="new"
                                                element={<NewUser />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<EditUser />}
                                            />
                                            <Route
                                                path="delete/:id"
                                                element={<DeleteUser />}
                                            />
                                        </Route>
                                    ) : (
                                        <Route
                                            path="*"
                                            element={<NoPermitPath />}
                                        />
                                    )}
                                </Route>
                                <Route path="departments">
                                    <Route index element={<Departments />} />
                                    {myRole === "super-admin" ||
                                    myRole === "admin" ? (
                                        <Route>
                                            <Route
                                                path="new"
                                                element={<NewDepartments />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<EditDepartments />}
                                            />
                                            <Route
                                                path="delete/:id"
                                                element={<DeleteDepartments />}
                                            />
                                        </Route>
                                    ) : (
                                        <Route
                                            path="*"
                                            element={<NoPermitPath />}
                                        />
                                    )}
                                </Route>
                                <Route path="notifications">
                                    <Route index element={<Notifications />} />
                                    <Route path="task/:id" element={<Task />} />
                                </Route>
                            </Route>
                            <Route path="maintenance" element={<Maintenance />}>
                                <Route index element={<KanbanBoard />} />
                                <Route path="maintenanceplans">
                                    <Route
                                        index
                                        element={<MaintenancePlans />}
                                    />
                                    {myRole === "chief" ||
                                    myRole === "admin" ? (
                                        <Route>
                                            <Route
                                                path="new"
                                                element={<NewPlan />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<EditPlan />}
                                            />
                                            <Route
                                                path="delete/:id"
                                                element={<DeletePlan />}
                                            />
                                        </Route>
                                    ) : (
                                        <Route
                                            path="*"
                                            element={<NoPermitPath />}
                                        />
                                    )}
                                </Route>
                            </Route>
                            <Route path="providers" element={<Providers />}>
                                <Route index element={<ProvidersList />} />
                                {myRole === "chief" || myRole === "admin" ? (
                                    <Route>
                                        <Route
                                            path="new"
                                            element={<NewProvider />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<EditProvider />}
                                        />
                                        <Route
                                            path="delete/:id"
                                            element={<DeleteProvider />}
                                        />
                                    </Route>
                                ) : (
                                    <Route
                                        path="*"
                                        element={<NoPermitPath />}
                                    />
                                )}
                                <Route path="agreements">
                                    <Route index element={<AgreementsList />} />
                                    {myRole === "chief" ||
                                    myRole === "admin" ? (
                                        <Route>
                                            <Route
                                                path="new"
                                                element={<NewAgreement />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<EditAgreement />}
                                            />
                                            <Route
                                                path="delete/:id"
                                                element={<DeleteAgreement />}
                                            />
                                        </Route>
                                    ) : (
                                        <Route
                                            path="*"
                                            element={<NoPermitPath />}
                                        />
                                    )}
                                </Route>
                            </Route>
                            <Route path="inventory" element={<Inventory />}>
                                <Route index element={<EquipmentList />} />
                                {myRole === "chief" || myRole === "admin" ? (
                                    <Route>
                                        <Route
                                            path="new"
                                            element={<NewEquipment />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<EditEquipment />}
                                        />
                                        <Route
                                            path="delete/:id"
                                            element={<DeleteEquipment />}
                                        />
                                    </Route>
                                ) : (
                                    <Route
                                        path="*"
                                        element={<NoPermitPath />}
                                    />
                                )}
                                <Route path="typelist">
                                    <Route
                                        index
                                        element={<EquipmentTypeList />}
                                    />
                                    {myRole === "chief" ||
                                    myRole === "admin" ? (
                                        <Route>
                                            <Route
                                                path="new"
                                                element={<NewEquipmentType />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<EditEquipmentType />}
                                            />
                                            <Route
                                                path="delete/:id"
                                                element={
                                                    <DeleteEquipmentType />
                                                }
                                            />
                                        </Route>
                                    ) : (
                                        <Route
                                            path="*"
                                            element={<NoPermitPath />}
                                        />
                                    )}
                                </Route>
                            </Route>
                            <Route
                                path="personalsettings"
                                element={<PersonalSettings />}
                            >
                                <Route index element={<EditMyInfo />} />
                                <Route
                                    path="password"
                                    element={<EditPassword />}
                                />
                            </Route>
                            <Route path="*" element={<ErrorPage />} />
                        </Route>
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
