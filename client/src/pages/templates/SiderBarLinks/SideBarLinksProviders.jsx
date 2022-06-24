import React from "react";
import { Link } from "react-router-dom";

const SideBarLinksProviders = () => {
    return (
        <nav className="navbar-dark">
            <ul className="navbar-nav px-3 py-3">
                <li className="nav-item">
                    <Link to="/providers" className="nav-link">
                        Providers
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="new" className="nav-link">
                        New Providers
                    </Link>
                </li>
                <hr />
                <li className="nav-item">
                    <Link to="agreements" className="nav-link">
                        Agreement
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="agreements/new" className="nav-link">
                        New Agreement
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideBarLinksProviders;
