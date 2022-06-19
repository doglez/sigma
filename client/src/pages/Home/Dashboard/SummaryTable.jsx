import React from "react";

const SummaryTable = () => {
    return (
        <div className="scrollable-horizontal">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Jan</th>
                        <th scope="col">Feb</th>
                        <th scope="col">Mar</th>
                        <th scope="col">Apr</th>
                        <th scope="col">May</th>
                        <th scope="col">Jun</th>
                        <th scope="col">Jul</th>
                        <th scope="col">Aug</th>
                        <th scope="col">Sep</th>
                        <th scope="col">Oct</th>
                        <th scope="col">Nov</th>
                        <th scope="col">Dec</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Plan</th>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <th scope="row">450</th>
                    </tr>
                    <tr>
                        <th scope="row">Done</th>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <td>25</td>
                        <td>50</td>
                        <th scope="row">450</th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row">%</th>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <td>100%</td>
                        <th scope="row">100%</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default SummaryTable;
