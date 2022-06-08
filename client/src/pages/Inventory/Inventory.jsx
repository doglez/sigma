import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../templates/SideBar.jsx";

const Inventory = () => {
    return (
        <div>
            <SideBar links="inventory" />
            <section className="main-page">
                <Outlet />
            </section>
        </div>
    );
};

export default Inventory;
