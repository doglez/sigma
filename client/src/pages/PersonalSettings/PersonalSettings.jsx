import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../templates/SideBar.jsx";

const PersonalSettings = () => {
    return (
        <div>
            <SideBar links="personalsettings" />
            <section className="main-page">
                <Outlet />
            </section>
        </div>
    );
};

export default PersonalSettings;
