import React from "react";
import { Link } from "react-router-dom";

const SideBarLinksMaintenance = () => {
    return (
        <nav className="navbar-dark">
            <ul className="navbar-nav px-3 py-3">
                <li className="nav-item">
                    <Link to="/maintenance" className="nav-link">
                        Kanban Board
                    </Link>
                </li>
                <hr />
                <li className="nav-item">
                    <Link to="maintenanceplans" className="nav-link">
                        Maintenance Plans
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="maintenanceplans/new" className="nav-link">
                        New Plan
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideBarLinksMaintenance;
