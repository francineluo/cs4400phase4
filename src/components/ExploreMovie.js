import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class ExploreMovie extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Explore Movie</h1>
                <div classname="vertical-list">
                    <div className="input-field">
                        Movie Name: <input type="text" name="movie" />
                    </div>
                    <div className="input-field">
                        Company Name: <input type="text" name="company" />
                    </div>
                    <div className="input-field">
                        City: <input type="text" name="city" />
                    </div>
                    <div className="input-field">
                        State: <input type="text" name="state" />
                    </div>
                    <div className="input-field">
                        Movie Play Date: <input type="text" name="playdate" />
                    </div>
                </div>
                <div className="button-group">
                    <div className="button">Filter</div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Movie</th>
                            <th>Theater</th>
                            <th>Address</th>
                            <th>Company</th>
                            <th>Play Date</th>
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
                    <div className="input-field">
                        Card Number: <input type="text" name="cardnumber" />
                    </div>
                    <Link to="/" className="button">View</Link>
                </div>
            </div>
        );
    }
}