import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../templates/SideBar.jsx";

const Providers = () => {
    return (
        <div>
            <SideBar links="providers" />
            <section className="main-page">
                <Outlet />
            </section>
        </div>
    );
};

export default Providers;
