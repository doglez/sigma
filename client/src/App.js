import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login">
                    <Route index element={<Login />} />
                    <Route path="forgotpassword" element={<ForgotPassword />} />
                </Route>
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
