import React from "react";

const ErrorPage = () => {
    return (
        <div className="error-page d-flex justify-content-center">
            <div className="text-center">
                <h1 className=" p-5">Error 404: Page not found.</h1>
                <i className="bi bi-emoji-frown rounded-circle emoji" />
            </div>
        </div>
    );
};

export default ErrorPage;
