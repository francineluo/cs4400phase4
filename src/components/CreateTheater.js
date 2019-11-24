import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class CreateTheater extends Component {
    render() {
        return (
            <div className="page-content">
                <h1>Create Theater</h1>
                <div id="create-theater">
                    <div className="input-field input-name">
                        Name: <input type="text" name="name" />
                    </div>
                    <div className="input-field input-company">
                        Company: <input type="text" name="company" />
                    </div>
                    <div className="input-field input-street">
                        Street Address: <input type="text" name="street" />
                    </div>
                    <div className="input-field input-city">
                        City: <input type="text" name="city" />
                    </div>
                    <div className="input-field input-state">
                        State: <input type="text" name="state" />
                    </div>
                    <div className="input-field input-zip">
                        Zipcode: <input type="text" name="zip" />
                    </div>
                    <div className="input-field input-capacity">
                        Capacity: <input type="text" name="capacity" />
                    </div>
                    <div className="input-field input-manager">
                        Manager: <input type="text" name="manager" />
                    </div>
                </div>
                <div className="button-group">
                    <Link to={{ pathname: "/functionality", state: { isAdmin: true } }} className="button">Back</Link>
                    <Link to="/" className="button">Create</Link>
                </div>
            </div>
        );
    }
}