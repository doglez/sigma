import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBarLinksHome = () => {
    const myRole = useSelector((state) => state.myInfoReducer.role);

    return (
        <nav className="navbar-dark">
            <ul className="navbar-nav px-3 py-3">
                <li className="nav-item">
                    <Link to="/home" className="nav-link">
                        Dashboard
                    </Link>
                </li>
                <hr />
                <li className="nav-item text-muted small fw-bold text-uppercase">
                    Setup
                </li>
                {myRole === "super-admin" ? (
                    <li className="nav-item">
                        <Link to="setupcompany" className="nav-link">
                            Company
                        </Link>
                    </li>
                ) : (
                    <></>
                )}

                <li className="nav-item">
                    <Link to="setuptheme" className="nav-link">
                        Theme
                    </Link>
                </li>
                <hr />
                <li className="nav-item text-muted small fw-bold text-uppercase">
                    Users & Departments
                </li>
                <li className="nav-item">
                    <Link to="users" className="nav-link">
                        Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="departments" className="nav-link">
                        Departments
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideBarLinksHome;
