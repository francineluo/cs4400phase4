import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class ExploreTheater extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Explore Theater</h1>
                <div classname="vertical-list">
                    <div className="input-field">
                        Theater Name: <input type="text" name="movie" />
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
                        </tr>
                        <tr>
                            <td>dummy data</td>
                            <td>dummy data</td>
                            <td>dummy data</td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-group">
                    <Link to="/" className="button">Back</Link>
                    <div className="input-field">
                        Visit Date: <input type="text" name="visitdate" />
                    </div>
                    <Link to="/" className="button">Log Visit</Link>
                </div>
            </div>
        );
    }
}