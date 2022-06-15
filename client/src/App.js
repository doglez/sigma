import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import NavBar from "./templates/NavBar.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NewUser from "./pages/Home/UserHome/NewUser.jsx";
import EditUser from "./pages/Home/UserHome/EditUser.jsx";
import DeleteUser from "./pages/Home/UserHome/DeleteUser.jsx";
import NewDepartments from "./pages/Home/Departments/NewDepartments.jsx";
import EditDepartments from "./pages/Home/Departments/EditDepartments.jsx";
import DeleteDepartments from "./pages/Home/Departments/DeleteDepartments.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="home" element={<Home />}>
                        <Route index element={<Dashboard />} />
                        <Route path="setupcompany" element={<SetupCompany />} />
                        <Route path="setuptheme" element={<SetupTheme />} />
                        <Route path="users">
                            <Route index element={<Users />} />
                            <Route path="new" element={<NewUser />} />
                            <Route path="edit/:id" element={<EditUser />} />
                            <Route path="delete/:id" element={<DeleteUser />} />
                        </Route>
                        <Route path="departments">
                            <Route index element={<Departments />} />
                            <Route path="new" element={<NewDepartments />} />
                            <Route
                                path="edit/:id"
                                element={<EditDepartments />}
                            />
                            <Route
                                path="delete/:id"
                                element={<DeleteDepartments />}
                            />
                        </Route>
                        <Route
                            path="notifications"
                            element={<Notifications />}
                        />
                    </Route>
                    <Route path="maintenance">
                        <Route index element={<Maintenance />} />
                    </Route>
                    <Route path="providers">
                        <Route index element={<Providers />} />
                    </Route>
                    <Route path="inventory">
                        <Route index element={<Inventory />} />
                    </Route>
                    <Route path="personalsettings">
                        <Route index element={<PersonalSettings />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Route>
                <Route path="/login">
                    <Route index element={<Login />} />
                    <Route path="forgotpassword" element={<ForgotPassword />} />
                    <Route
                        path="passwordrecovery"
                        element={<PasswordRecovery />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
