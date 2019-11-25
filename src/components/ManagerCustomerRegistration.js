import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class ManagerCustomerRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMessage: false,
            message: "",
            creditCards: []
        }
        this.addCard = this.addCard.bind(this);
    }

    register(e) {
        e.preventDefault();
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let username = document.getElementById("username").value;
        let company = document.getElementById("company").value;
        let pw = document.getElementById("pw").value;
        let confirmpw = document.getElementById("confirmpw").value;
        let street = document.getElementById("street").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let zip = document.getElementById("zip").value;

        if (fname.length === 0 || lname.length === 0 || username.length === 0 ||
            pw.length === 0 || confirmpw.length === 0 || company.length === 0 ||
            street.length === 0 || city.length === 0 || state.length === 0 || zip.length === 0) {
            this.setState({
                showMessage: true,
                message: "Please fill out all fields"
            });
            return;
        }

        if (this.state.creditCards.length === 0) {
            this.setState({
                showMessage: true,
                message: "You must have at least one credit card"
            });
            return;
        }

        let allUsernames = StaticData.getAllUsernames();
        if (allUsernames.includes(username)) {
            this.setState({
                showMessage: true,
                message: "Username is taken"
            });
            return;
        } else if (pw.length < 8) {
            this.setState({
                showMessage: true,
                message: "Password must be at least 8 characters"
            });
            return;
        } else if (pw !== confirmpw) {
            this.setState({
                showMessage: true,
                message: "Confirm password does not match password"
            });
            return;
        }
        //TODO: check for unique address

        StaticData.registerManagerCustomer(fname, lname, username, pw, this.state.creditCards);
        this.setState({ redirect: true });
    }

    creditCardNums() {
        let elements = [];
        for (let i in this.state.creditCards) {
            elements.push(
                <div className="card-info">
                    {this.state.creditCards[i]}
                    <div className="card-button" name="remove" onClick={e => this.removeCard(i)}>Remove</div>
                </div>
            );
        }

        if (elements.length < 5) {
            elements.push(
                <div className="card-info">
                    <input type="text" name="newcard" id="newcard" />
                    <div className="card-button" onClick={this.addCard}>Add</div>
                </div>
            );
        }

        return (
            <div className="vertical-list">
                {elements}
            </div>
        );
    }

    removeCard(i) {
        let updatedCards = this.state.creditCards;
        updatedCards.splice(i, 1);
        this.setState({
            creditCards: updatedCards
        });
    }

    addCard() {
        let newCard = document.getElementById("newcard").value;
        //TODO: check for unique credit card among ALL user, not just current one
        if (this.state.creditCards.includes(newCard)) {
            this.setState({
                showMessage: true,
                message: "That credit card number is already being used"
            });
            return;
        }
        let updatedCards = this.state.creditCards;
        updatedCards.push(newCard);
        this.setState({
            creditCards: updatedCards
        });
    }

    showMessage() {
        if (this.state.showMessage) {
            return (<p style={{ color: "red" }}>{this.state.message}</p>);
        }
    }

    companyDropdown() {
        //TODO: retrieve company list
        return (
            <select name="company" id="company">
                <option value="AMC">AMC</option>
            </select>
        );
    }

    stateDropdown() {
        //TODO: retrieve state list
        return (
            <select name="state" id="state">
                <option value="GA">GA</option>
            </select>
        );
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/functionality" />);
        }

        return (
            <div className="page-content">
                <h1>Manager-Customer Registration</h1>
                {this.showMessage()}
                <div id="manager-customer-registration">
                    <div className="input-field input-fname">
                        First Name: <input type="text" name="fname" id="fname" />
                    </div>
                    <div className="input-field input-lname">
                        Last Name: <input type="text" name="lname" id="lname" />
                    </div>
                    <div className="input-field input-username">
                        Username: <input type="text" name="username" id="username" />
                    </div>
                    <div className="input-field input-company">
                        Company: {this.companyDropdown()}
                    </div>
                    <div className="input-field input-pw">
                        Password: <input type="text" name="pw" id="pw" />
                    </div>
                    <div className="input-field input-confirmpw">
                        Confirm Password: <input type="text" name="confirmpw" id="confirmpw" />
                    </div>
                    <div className="input-field input-street">
                        Street Address: <input type="text" name="street" id="street" />
                    </div>
                    <div className="input-field input-city">
                        City: <input type="text" name="city" id="city" />
                    </div>
                    <div className="input-field input-state">
                        State: {this.stateDropdown()}
                    </div>
                    <div className="input-field input-zip">
                        Zipcode: <input type="text" name="zip" id="zip" />
                    </div>
                    <div className="credit-card-nums">
                        Credit Card #
                        {this.creditCardNums()}
                    </div>
                </div>
                <div className="button-group">
                    <Link to="/registernav" className="button">Back</Link>
                    <input className="button" type="submit" value="Register" onClick={e => this.register(e)} />
                </div>
            </div>
        );
    }
}