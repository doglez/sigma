import React from "react";
import SideBarLinksHome from "./SiderBarLinks/SideBarLinksHome.jsx";
import SideBarLinksInventory from "./SiderBarLinks/SideBarLinksInventory.jsx";
import SideBarLinksMaintenance from "./SiderBarLinks/SideBarLinksMaintenance.jsx";
import SideBarLinksPersonalSettings from "./SiderBarLinks/SideBarLinksPersonalSettings.jsx";
import SideBarLinksProviders from "./SiderBarLinks/SideBarLinksProviders.jsx";

const SideBar = ({ links }) => {
    return (
        <div>
            <div
                className="offcanvas offcanvas-start side-bar bg-dark text-white"
                tabIndex={-1}
                id="offcanvasTrigger"
                aria-labelledby="offcanvasLabel"
            >
                <div
                    className="offcanvas-body p-0 "
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    <div className="d-flex justify-content-center mt-3">
                        <img
                            src={`${process.env.REACT_APP_API_URL}/logo-company.png`}
                            alt="Company-Name"
                            className="rounded log-company"
                        />
                    </div>
                    {links === "home" ? (
                        <SideBarLinksHome />
                    ) : links === "maintenance" ? (
                        <SideBarLinksMaintenance />
                    ) : links === "providers" ? (
                        <SideBarLinksProviders />
                    ) : links === "inventory" ? (
                        <SideBarLinksInventory />
                    ) : links === "personalsettings" ? (
                        <SideBarLinksPersonalSettings />
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
