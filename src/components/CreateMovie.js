import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class CreateMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMessage: false,
            message: "",
            messageColor: "red",
            response: null
        }
        this.createMovie = this.createMovie.bind(this);
        this.verifyData = this.verifyData.bind(this);
    }

    checkFields() {
        let name = document.getElementById("name").value;
        let duration = document.getElementById("duration").value;
        let releasedate = document.getElementById("releasedate").value;

        if (name.length === 0 || duration.length === 0 || releasedate.length === 0) {
            this.setState({
                showMessage: true,
                message: "Please fill out all fields",
                messageColor: "red"
            });
            return false;
        }

        if (duration.charAt(0) === "-") {
            this.setState({
                showMessage: true,
                message: "Duration cannot be negative number",
                messageColor: "red"
            });
            return false;
        }
        return true;
    }

    createMovie() {
        if (this.checkFields()) {
            var url = new URL("http://" + window.location.host + "/api/admin_create_mov");
            var params = {
                name: document.getElementById("name").value,
                duration: document.getElementById("duration").value,
                releasedate: document.getElementById("releasedate").value
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json())
                .then(data => this.verifyData(data));
        }
    }

    verifyData(data) {
        if (typeof data.error === "undefined") {
            this.setState({
                showMessage: true,
                message: "Movie was successfully created",
                messageColor: "green"
            });
        } else if (data.error === "ER_DUP_ENTRY") {
            this.setState({
                showMessage: true,
                message: "That movie already exists",
                messageColor: "red"
            });
        } else if (data.error === "ER_TRUNCATED_WRONG_VALUE") {
            this.setState({
                showMessage: true,
                message: "Invalid input",
                messageColor: "red"
            });
        } else {
            this.setState({
                showMessage: true,
                message: "There was a problem trying to create the movie",
                messageColor: "red"
            });
        }
    }

    showMessage() {
        if (this.state.showMessage) {
            return (<p style={{ color: this.state.messageColor }}>{this.state.message}</p>);
        }
    }

    render() {
        return (
            <div className="page-content">
                <h1>Create Movie</h1>
                {this.showMessage()}
                <div className="vertical-list">
                    <div className="input-field">
                        Name: <input type="text" name="name" id="name" />
                    </div>
                    <div className="input-field">
                        Duration: <input type="number" name="duration" id="duration" min="0"/>
                    </div>
                    <div className="input-field">
                        Release Date: <input type="date" name="releasedate" id="releasedate" />
                    </div>
                </div>
                <div className="button-group">
                    <Link to="/functionality" className="button">Back</Link>
                    <div className="button" onClick={this.createMovie} > Create</div>
                </div>
            </div>
        );
    }
}