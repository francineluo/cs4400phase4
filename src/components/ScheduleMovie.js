import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class ScheduleMovie extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Schedule Movie</h1>
                <div classname="vertical-list">
                    <div className="input-field">
                        Name: <input type="text" name="name" />
                    </div>
                    <div className="input-field">
                        Release Date: <input type="text" name="releasedate" />
                    </div>
                    <div className="input-field">
                        Play Date: <input type="text" name="play date" />
                    </div>
                </div>
                <div className="button-group">
                    <Link to={{ pathname: "/functionality", state: { isManager: true } }} className="button">Back</Link>
                    <Link to="/" className="button">Add</Link>
                </div>
            </div>
        );
    }
}