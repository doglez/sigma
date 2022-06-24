import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../templates/SideBar.jsx";

const Home = () => {
    return (
        <div>
            <SideBar links="home" />
            <section className="main-page">
                <Outlet />
            </section>
        </div>
    );
};

export default Home;
