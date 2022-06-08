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
import Notifications from "./pages/Home/Notify/Notifications.jsx";
import PersonalSettings from "./pages/PersonalSettings/PersonalSettings.jsx";
import Providers from "./pages/Providers/Providers.jsx";
import NavBar from "./templates/NavBar.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="home" element={<Home />}>
                        <Route index element={<Dashboard />} />
                        <Route path="setupcompany" element={<SetupCompany />} />
                        <Route path="setuptheme" element={<SetupTheme />} />
                        <Route path="users" element={<Users />} />
                        <Route path="departments" element={<Departments />} />
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
