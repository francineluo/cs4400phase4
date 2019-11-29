import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class CustomerRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMessage: false,
            message: "",
            allUsernames: [],
            allCreditCards: [],
            userInfo: [],
            creditCards: []
        }
        this.addCard = this.addCard.bind(this);
    }

    componentDidMount() {
        this.getAllUsernames();
        this.getAllCreditCards();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.userInfo !== this.state.userInfo) {
            StaticData.setCurrentUser(this.state.userInfo);
            this.setState({ redirect: true });
        }
    }

    getAllUsernames() {
        fetch("/api/get_all_usernames")
            .then(response => response.json())
            .then(data => this.setState({ allUsernames: data }));
    }

    getAllCreditCards() {
        fetch("/api/get_all_creditcards")
            .then(response => response.json())
            .then(data => this.setState({ allCreditCards: data }));
    }

    checkFields() {
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let username = document.getElementById("username").value;
        let pw = document.getElementById("pw").value;
        let confirmpw = document.getElementById("confirmpw").value;

        if (fname.length === 0 || lname.length === 0 || username.length === 0 ||
            pw.length === 0 || confirmpw.length === 0) {
            this.setState({
                showMessage: true,
                message: "Please fill out all fields"
            });
            return false;
        }

        let usernameArray = [];
        for (let i in this.state.allUsernames) {
            usernameArray.push(this.state.allUsernames[i].username);
        }
        if (usernameArray.includes(username)) {
            this.setState({
                showMessage: true,
                message: "Username is taken"
            });
            return false;
        } else if (pw.length < 8) {
            this.setState({
                showMessage: true,
                message: "Password must be at least 8 characters"
            });
            return false;
        } else if (pw !== confirmpw) {
            this.setState({
                showMessage: true,
                message: "Confirm password does not match password"
            });
            return false;
        } else if (this.state.creditCards.length === 0) {
            this.setState({
                showMessage: true,
                message: "You must have at least one credit card"
            });
            return false;
        }
        return true;
    }

    register(e) {
        e.preventDefault();
        if (this.checkFields()) {
            //register
            var url = new URL("http://" + window.location.host + "/api/customer_only_register");
            var params = {
                username: document.getElementById("username").value,
                password: document.getElementById("pw").value,
                fname: document.getElementById("fname").value,
                lname: document.getElementById("lname").value
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json());

            //add cards
            for (let i in this.state.creditCards) {
                url = new URL("http://" + window.location.host + "/api/customer_add_creditcard");
                params = {
                    username: document.getElementById("username").value,
                    creditcard: this.state.creditCards[i]
                };
                url.search = new URLSearchParams(params).toString();

                fetch(url)
                    .then(response => response.json());
            }

            //login
            url = new URL("http://" + window.location.host + "/api/user_login");
            params = {
                username: document.getElementById("username").value,
                password: document.getElementById("pw").value
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json());

            fetch("/api/get_user_info")
                .then(response => response.json())
                .then(data => this.setState({ userInfo: data }));
        }
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
                    <input type="number" name="newcard" id="newcard" min="0" />
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
        if (newCard.length !== 16) {
            this.setState({
                showMessage: true,
                message: "Credit card number must be 16 digits"
            });
            return;
        } else if (newCard.charAt(0) === "-") {
            this.setState({
                showMessage: true,
                message: "Credit card number cannot be a negative number"
            });
            return;
        }

        let cardArray = [];
        for (let i in this.state.allCreditCards) {
            cardArray.push(this.state.allCreditCards[i].creditCardNum);
        }
        if (cardArray.includes(newCard)) {
            this.setState({
                showMessage: true,
                message: "That credit card number is already being used"
            });
            return;
        }

        let updatedCards = this.state.creditCards;
        updatedCards.push(newCard);
        this.setState({
            showMessage: false,
            creditCards: updatedCards
        });
    }

    showMessage() {
        if (this.state.showMessage) {
            return (<p style={{ color: "red" }}>{this.state.message}</p>);
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/functionality" />);
        }

        return (
            <div className="page-content">
                <h1>Customer Registration</h1>
                {this.showMessage()}
                <div id="customer-registration">
                    <div className="input-field input-fname">
                        First Name: <input type="text" name="fname" id="fname" />
                    </div>
                    <div className="input-field input-lname">
                        Last Name: <input type="text" name="lname" id="lname" />
                    </div>
                    <div className="input-field input-username">
                        Username: <input type="text" name="username" id="username" />
                    </div>
                    <div className="input-field input-pw">
                        Password: <input type="password" name="pw" id="pw" />
                    </div>
                    <div className="input-field input-confirmpw">
                        Confirm Password: <input type="password" name="confirmpw" id="confirmpw" />
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