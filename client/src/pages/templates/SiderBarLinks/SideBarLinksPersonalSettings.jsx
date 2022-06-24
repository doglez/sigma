import React from "react";
import { Link } from "react-router-dom";

const SideBarLinksPersonalSettings = () => {
    return (
        <nav className="navbar-dark">
            <ul className="navbar-nav px-3 py-3">
                <hr />
                <li className="nav-item">
                    <Link to="/personalsettings" className="nav-link">
                        My info
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="password" className="nav-link">
                        Edit Password
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideBarLinksPersonalSettings;
