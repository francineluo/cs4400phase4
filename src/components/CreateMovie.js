import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class CreateMovie extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Create Movie</h1>
                <div classname="vertical-list">
                    <div className="input-field">
                        Name: <input type="text" name="name" />
                    </div>
                    <div className="input-field">
                        Duration: <input type="text" name="duration" />
                    </div>
                    <div className="input-field">
                        Release Date: <input type="text" name="releasedate" />
                    </div>
                </div>
                <div className="button-group">
                    <Link to="/" className="button">Back</Link>
                    <Link to="/" className="button">Create</Link>
                </div>
            </div>
        );
    }
}