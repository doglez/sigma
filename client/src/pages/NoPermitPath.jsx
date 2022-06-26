import React from "react";

const NoPermitPath = () => {
    return (
        <div className="error-page d-flex justify-content-center">
            <div className="text-center">
                <h1 className=" p-5">
                    Sorry: You do not have permissions for this path, please
                    talk to your administrator to resolve this issue.
                </h1>
                <i className="bi bi-emoji-dizzy rounded-circle emoji" />
            </div>
        </div>
    );
};

export default NoPermitPath;
