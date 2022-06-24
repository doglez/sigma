import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../templates/SideBar.jsx";

const Maintenance = () => {
    return (
        <div>
            <SideBar links="maintenance" />
            <section className="main-page">
                <Outlet />
            </section>
        </div>
    );
};

export default Maintenance;
