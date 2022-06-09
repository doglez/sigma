import React from "react";

const DetailCards = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="card text-white bg-secondary mb-3 col me-3">
                    <div className="card-header">Backlog</div>
                    <div className="card-body">
                        <h5 className="card-title text-center">350</h5>
                        <p className="card-text">
                            Inventory pending maintenance.
                        </p>
                    </div>
                </div>
                <div className="card text-white bg-primary mb-3 col">
                    <div className="card-header">In Progress</div>
                    <div className="card-body">
                        <h5 className="card-title text-center">250</h5>
                        <p className="card-text">
                            45% Preventive. 65% Corrective.
                        </p>
                    </div>
                </div>
                <div className="card text-white bg-success mb-3 col mx-3">
                    <div className="card-header">Done</div>
                    <div className="card-body">
                        <h5 className="card-title text-center">100</h5>
                        <p className="card-text">75% Planned.</p>
                    </div>
                </div>
                <div className="card text-dark bg-warning mb-3 col">
                    <div className="card-header">Delayed</div>
                    <div className="card-body">
                        <h5 className="card-title text-center">25</h5>
                        <p className="card-text">Just planned activities.</p>
                    </div>
                </div>
                <div className="card text-white bg-danger mb-3 col ms-3">
                    <div className="card-header">Cancel</div>
                    <div className="card-body">
                        <h5 className="card-title text-center">5</h5>
                        <p className="card-text">Click to see...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCards;
