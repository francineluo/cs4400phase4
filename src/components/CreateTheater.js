import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class CreateTheater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMessage: false,
            message: "",
            allCompanies: [],
            eligibleManagers: [],
            companyTheaters: []
        }
        this.getEligibleManagers = this.getEligibleManagers.bind(this);
        this.getCompanyTheaters = this.getCompanyTheaters.bind(this);
        this.createTheater = this.createTheater.bind(this);
    }

    componentDidMount() {
        this.getAllCompanies();
        this.getEligibleManagers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.companyTheaters !== this.state.companyTheaters) {
            this.createTheater();
        }
        if (prevState.allCompanies !== this.state.allCompanies) {
            this.getEligibleManagers();
        }
    }

    getAllCompanies() {
        fetch("/api/get_all_companies")
            .then(response => response.json())
            .then(data => this.setState({ allCompanies: data }));
    }

    getEligibleManagers() {
        let company = document.getElementById("company").value;
        fetch("/api/get_eligible_managers?company=" + company)
            .then(response => response.json())
            .then(data => this.setState({ eligibleManagers: data }));
    }

    //called right before creating a theater to check if name is unique
    getCompanyTheaters() {
        let company = document.getElementById("company").value;
        fetch("/api/get_company_theaters?comName=" + company)
            .then(response => response.json())
            .then(data => this.setState({ companyTheaters: data }));
    }

    checkFields() {
        let name = document.getElementById("name").value;
        let company = document.getElementById("company").value;
        let street = document.getElementById("street").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let zip = document.getElementById("zip").value;
        let capacity = document.getElementById("capacity").value;
        let manager = document.getElementById("manager").value;

        if (name.length === 0 || company.length === 0 || street.length === 0 || city.length === 0 ||
            state.length === 0 || zip.length === 0 || capacity.length === 0 || manager.length === 0) {
            this.setState({
                showMessage: true,
                message: "Please fill out all fields"
            });
            return false;
        }

        if (manager === "N/A") {
            this.setState({
                showMessage: true,
                message: "Theater must have a manager"
            });
            return false;
        }

        let theaternameArray = [];
        for (let i in this.state.companyTheaters) {
            theaternameArray.push(this.state.companyTheaters[i].thName);
        }
        if (theaternameArray.includes(name)) {
            this.setState({
                showMessage: true,
                message: "Theater name is taken"
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
        } else if (capacity.charAt(0) === "-") {
            this.setState({
                showMessage: true,
                message: "Capacity cannot be negative number"
            });
            return false;
        }
        return true;
    }

    createTheater() {
        if (this.checkFields()) {
            var url = new URL("http://" + window.location.host + "/api/admin_create_theater");
            var params = {
                thName: document.getElementById("name").value,
                comName: document.getElementById("company").value,
                street: document.getElementById("street").value,
                city: document.getElementById("city").value,
                state: document.getElementById("state").value,
                zip: document.getElementById("zip").value,
                capacity: document.getElementById("capacity").value,
                manager: document.getElementById("manager").value
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json());

            this.setState({ redirect: true });
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
            <select name="company" id="company" onChange={this.getEligibleManagers} >
                {elements}
            </select>
        );
    }

    managerDropdown() {
        let elements = [];
        for (let i in this.state.eligibleManagers) {
            let manager = this.state.eligibleManagers[i].username;
            elements.push(
                <option key={manager} value={manager}>{manager}</option>
            );
        }

        if (elements.length === 0) {
            elements.push(
                <option key="N/A" value="N/A">N/A</option>
            );
        }

        return (
            <select name="manager" id="manager">
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
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
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
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VA">VA</option>
                <option value="VT">VT</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
            </select>
        );
    }

    showMessage() {
        if (this.state.showMessage) {
            return (<p style={{ color: "red" }}>{this.state.message}</p>);
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/managecompany" />);
        }

        return (
            <div className="page-content">
                <h1>Create Theater</h1>
                {this.showMessage()}
                <div id="create-theater">
                    <div className="input-field input-name">
                        Name: <input type="text" name="name" id="name" />
                    </div>
                    <div className="input-field input-company">
                        Company: {this.companyDropdown()}
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
                    <div className="input-field input-capacity">
                        Capacity: <input type="number" name="capacity" id="capacity" />
                    </div>
                    <div className="input-field input-manager">
                        Manager: {this.managerDropdown()}
                    </div>
                </div>
                <div className="button-group">
                    <Link to="/managecompany" className="button">Back</Link>
                    <div className="button" onClick={this.getCompanyTheaters}>Create</div>
                </div>
            </div>
        );
    }
}