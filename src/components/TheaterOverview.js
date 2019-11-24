import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class TheaterOverview extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Theater Overview</h1>
                <div classname="vertical-list">
                    <div className="input-field">
                        Movie Name: <input type="text" name="name" />
                    </div>
                    <div className="input-field">
                        Movie Duration: <input type="text" name="duration" />
                    </div>
                    <div className="input-field">
                        Movie Release Date: <input type="text" name="releasedate" />
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
                            <th>Movie Name</th>
                            <th>Duration</th>
                            <th>Release Date</th>
                            <th>Play Date</th>
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
                    <Link to={{ pathname: "/functionality", state: { isManager: true } }} className="button">Back</Link>
                </div>
            </div>
        );
    }
}