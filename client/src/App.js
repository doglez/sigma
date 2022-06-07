import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import Login from "./pages/Auth/Login.jsx";
import PasswordRecovery from "./pages/Auth/PasswordRecovery.jsx";
import Home from "./pages/Home.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login">
                    <Route index element={<Login />} />
                    <Route path="forgotpassword" element={<ForgotPassword />} />
                    <Route
                        path="passwordrecovery"
                        element={<PasswordRecovery />}
                    />
                </Route>
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
