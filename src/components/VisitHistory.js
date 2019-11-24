import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class VisitHistory extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Visit History</h1>
                <div classname="vertical-list">
                    <div className="input-field">
                        Company Name: <input type="text" name="company" />
                    </div>
                    <div className="input-field">
                        Visit Date: <input type="text" name="visitdate" />
                    </div>
                </div>
                <div className="button-group">
                    <div className="button">Filter</div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Theater</th>
                            <th>Address</th>
                            <th>Company</th>
                            <th>Visit Date</th>
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
                    <Link to={{ pathname: "/functionality", state: {} }} className="button">Back</Link>
                </div>
            </div>
        );
    }
}