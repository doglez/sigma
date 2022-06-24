import React from "react";
import { Link } from "react-router-dom";

const SideBarLinksInventory = () => {
    return (
        <nav className="navbar-dark">
            <ul className="navbar-nav px-3 py-3">
                <li className="nav-item">
                    <Link to="/inventory" className="nav-link">
                        Inventory Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="new" className="nav-link">
                        New Equipment
                    </Link>
                </li>
                <hr />
                <li className="nav-item">
                    <Link to="typelist" className="nav-link">
                        Equipment Type List
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="typelist/new" className="nav-link">
                        New Equipment Type
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideBarLinksInventory;
