import React from "react";
import DetailCards from "./DetailCards.jsx";
import SummaryTable from "./SummaryTable.jsx";

const Dashboard = () => {
    return (
        <div className="container pt-4">
            <div className="d-flex justify-content-between">
                <select
                    className="form-select mb-3 border-pink"
                    aria-label="Default select example"
                >
                    <option defaultValue>Year</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </select>

                <select
                    className="form-select mb-3 mx-5 month-select border-orange"
                    aria-label="Default select example"
                >
                    <option defaultValue>Month</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </select>

                <select
                    className="form-select mb-3 department-select border-teal"
                    aria-label="Default select example"
                >
                    <option defaultValue>Department</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </select>
            </div>
            <DetailCards />
            <SummaryTable />
        </div>
    );
};

export default Dashboard;
