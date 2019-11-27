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
            allUsernames: [],
            allCreditCards: [],
            allCompanies: [],
            userInfo: [],
            creditCards: []
        }
        this.addCard = this.addCard.bind(this);
    }

    componentDidMount() {
        this.getAllUsernames();
        this.getAllCreditCards();
        this.getAllCompanies();
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

    getAllCompanies() {
        fetch("/api/get_all_companies")
            .then(response => response.json())
            .then(data => this.setState({ allCompanies: data }));
    }

    checkFields() {
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
        } else if (zip.length !== 5) {
            this.setState({
                showMessage: true,
                message: "Zipcode must be 5 digits"
            });
            return false;
        } else if (zip.charAt(0) === "-") {
            this.setState({
                showMessage: true,
                message: "Zipcode cannot be negative number"
            });
            return false;
        } else if (this.state.creditCards.length === 0) {
            this.setState({
                showMessage: true,
                message: "You must have at least one credit card"
            });
            return false;
        }
        //TODO: check for unique address
        return true;
    }

    register(e) {
        e.preventDefault();
        if (this.checkFields()) {
            //register
            var url = new URL("http://" + window.location.host + "/api/manager_customer_register");
            var params = {
                username: document.getElementById("username").value,
                password: document.getElementById("pw").value,
                fname: document.getElementById("fname").value,
                lname: document.getElementById("lname").value,
                comName: document.getElementById("company").value,
                street: document.getElementById("street").value,
                city: document.getElementById("city").value,
                state: document.getElementById("state").value,
                zip: document.getElementById("zip").value
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json());

            //add cards
            for (let i in this.state.creditCards) {
                url = new URL("http://" + window.location.host + "/api/manager_customer_add_creditcard");
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
                    <input type="number" name="newcard" id="newcard" min="0"/>
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

    companyDropdown() {
        let elements = [];
        for (let i in this.state.allCompanies) {
            let company = this.state.allCompanies[i].comName;
            elements.push(
                <option key={company} value={company}>{company}</option>
            );
        }

        return (
            <select name="company" id="company">
                {elements}
            </select>
        );
    }

    stateDropdown() {
        return (
            <select name="state" id="state">
                <option value="AK">AK</option>
                <option value="AL">AL</option>
                <option value="AR">AR</option>
                <option value="AS">AS</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="GU">GU</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>
                <option value="MP">MP</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="PR">PR</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UM">UM</option>
                <option value="UT">UT</option>
                <option value="VA">VA</option>
                <option value="VI">VI</option>
                <option value="VT">VT</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
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
                        Zipcode: <input type="number" name="zip" id="zip" min="0" />
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