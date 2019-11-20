import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class ViewHistory extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>View History</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Movie</th>
                            <th>Theater</th>
                            <th>Company</th>
                            <th>Card#</th>
                            <th>View Date</th>
                        </tr>
                        <tr>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-group">
                    <Link to="/" className="button">Back</Link>
                </div>
            </div>
        );
    }
}