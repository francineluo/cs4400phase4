import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class ManageCompany extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Manage Company</h1>
                <div className="vertical-list">
                    <div>
                        <div className="input-field">
                            Name: <input type="text" name="name" />
                        </div>
                        <div className="input-field">
                            #City Covered: <input type="text" name="cities" />
                        </div>
                        <div className="input-field">
                            #Theaters: <input type="text" name="theaters" />
                        </div>
                        <div className="input-field">
                            #Employees: <input type="text" name="employees" />
                        </div>
                    </div>
                    <div className="button-group">
                        <div className="button">Filter</div>
                        <div className="button">Create Theater</div>
                        <div className="button">Detail</div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>#City Covered</th>
                                <th>#Theaters</th>
                                <th>#Employees</th>
                            </tr>
                            <tr>
                                <td>dummy data</td>
                                <td>dummy data</td>
                                <td>dummy data</td>
                                <td>dummy data</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="button-group">
                        <Link to={{ pathname: "/functionality", state: { isAdmin: true } }} className="button">Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}