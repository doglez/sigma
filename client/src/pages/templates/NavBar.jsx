import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/images/summation.png";

const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const HandleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    {/* Offcanvas button trigger */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasTrigger"
                        aria-controls="offcanvasTrigger"
                    >
                        <i className="bi bi-list menu-icon" />
                    </button>
                    {/* End Offcanvas button trigger */}

                    <Link
                        to="/home"
                        className="navbar-brand fw-bold text-uppercase"
                    >
                        <img
                            src={Logo}
                            alt="SIGMA Logo"
                            className="img-fluid pe-2 logo-navbar"
                        />
                        SIGMA
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={HandleDrawer}
                    >
                        <i
                            className={
                                mobileOpen
                                    ? "bi bi-x-lg menu-icon"
                                    : "bi bi-list menu-icon"
                            }
                        />
                    </button>
                    <div
                        className={
                            !mobileOpen
                                ? "navbar-collapse d-none"
                                : "navbar-collapse"
                        }
                    >
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            <li className="nav-item navbar-tablet">
                                <Link
                                    className="nav-link"
                                    aria-current="page"
                                    to="/home/notifications"
                                    onClick={HandleDrawer}
                                >
                                    <i className="bi bi-bell-fill" />
                                </Link>
                            </li>
                            <li className="nav-item navbar-tablet">
                                <Link
                                    className="nav-link"
                                    to="home"
                                    onClick={HandleDrawer}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item navbar-tablet">
                                <Link
                                    className="nav-link"
                                    to="/maintenance"
                                    onClick={HandleDrawer}
                                >
                                    Maintenance
                                </Link>
                            </li>
                            <li className="nav-item navbar-tablet">
                                <Link
                                    className="nav-link"
                                    to="/providers"
                                    onClick={HandleDrawer}
                                >
                                    Providers
                                </Link>
                            </li>
                            <li className="nav-item navbar-tablet">
                                <Link
                                    className="nav-link"
                                    to="/inventory"
                                    onClick={HandleDrawer}
                                >
                                    Inventory
                                </Link>
                            </li>
                        </ul>
                        <div className="nav-item dropdown navbar-tablet">
                            <div
                                className="nav-link dropdown-toggle text-secondary"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-person-fill" />
                            </div>
                            <ul
                                className="dropdown-menu dropdown-menu-end mt-2 bg-dark"
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <Link
                                        className="dropdown-item text-white dropdown-item-modify"
                                        to="/personalsettings"
                                        onClick={HandleDrawer}
                                    >
                                        Personal Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item text-white bg-dark dropdown-item-modify"
                                        to="/logout"
                                    >
                                        Sign out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default NavBar;
