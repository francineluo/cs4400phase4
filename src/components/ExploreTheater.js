import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class ExploreTheater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMessage: false,
            message: "",
            messageColor: "red",
            allTheaters: [],
            allCompanies: [],
            filteredTheaters: [],
            currentUser: StaticData.getCurrentUser()
        }
        this.filterTheaters = this.filterTheaters.bind(this);
        this.visitTheater = this.visitTheater.bind(this);
        this.verifyData = this.verifyData.bind(this);
    }

    componentDidMount() {
        if (typeof this.state.currentUser === "undefined") {
            this.setState({
                loggedOut: true
            });
        } else {
            this.getAllTheaters();
            this.getAllCompanies();
            this.filterTheaters();
        }
    }

    getAllTheaters() {
        fetch("/api/get_all_theaters")
            .then(response => response.json())
            .then(data => this.setState({ allTheaters: data }));
    }

    getAllCompanies() {
        fetch("/api/get_all_companies")
            .then(response => response.json())
            .then(data => this.setState({ allCompanies: data }));
    }

    filterTheaters() {
        this.setState({ showMessage: false });

        var url = new URL("http://" + window.location.host + "/api/user_filter_th");
        var params = {
            theater: document.getElementById("theater").value,
            company: document.getElementById("company").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json());

        fetch("/api/user_get_filtered_th")
            .then(response => response.json())
            .then(data => this.setState({ filteredTheaters: data }));
    }

    visitTheater() {
        let selectedTheater = this.getSelectedTheater();
        let theaterInfo = selectedTheater.split(" --- ");
        var url = new URL("http://" + window.location.host + "/api/user_visit_th");
        var params = {
            theater: theaterInfo[0],
            company: theaterInfo[1],
            visitDate: document.getElementById("visitDate").value,
            username: this.state.currentUser.username
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json())
            .then(data => this.verifyData(data));
    }

    verifyData(data) {
        if (typeof data.error === "undefined") {
            this.setState({
                showMessage: true,
                message: "Visit was successfully logged",
                messageColor: "green"
            });
        } else if (data.error === "ER_TRUNCATED_WRONG_VALUE") {
            this.setState({
                showMessage: true,
                message: "Invalid visit date",
                messageColor: "red"
            });
        } else {
            this.setState({
                showMessage: true,
                message: "There was a problem trying to log the visit",
                messageColor: "red"
            });
        }
    }

    getSelectedTheater() {
        let radioButtons = document.getElementsByName("radio");
        let selectedIndex = 0;
        for (let i in radioButtons) {
            if (radioButtons[i].checked) {
                selectedIndex = i;
                break;
            }
        }
        return radioButtons[selectedIndex].value;
    }

    theaterList() {
        let elements = [];
        for (let i = 0; i < this.state.filteredTheaters.length; i++) {
            let theater = this.state.filteredTheaters[i];
            let address = theater.thStreet.concat(", ", theater.thCity, ", ", theater.thState, " ", theater.thZipcode);
            let key = theater.thName + " --- " + theater.comName;
            if (i === 0) {
                elements.push(
                    <tr key={key}>
                        <td><input type="radio" name="radio" value={key} defaultChecked /></td>
                        <td>{theater.thName}</td>
                        <td>{address}</td>
                        <td>{theater.comName}</td>
                    </tr>
                );
            } else {
                elements.push(
                    <tr key={key}>
                        <td><input type="radio" name="radio" value={key} /></td>
                        <td>{theater.thName}</td>
                        <td>{address}</td>
                        <td>{theater.comName}</td>
                    </tr>
                );
            }
        }

        if (elements.length === 0) {
            return (<p>No theaters found. Try changing the filters.</p>);
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Theater</th>
                        <th>Address</th>
                        <th>Company</th>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }

    theaterDropdown() {
        let elements = [];
        elements.push(<option key="ALL" value="ALL">-- ALL --</option>);
        for (let i in this.state.allTheaters) {
            let theater = this.state.allTheaters[i].thName;
            elements.push(
                <option key={theater} value={theater}>{theater}</option>
            );
        }

        return (
            <select name="theater" id="theater">
                {elements}
            </select>
        );
    }

    companyDropdown() {
        let elements = [];
        elements.push(<option key="ALL" value="ALL">-- ALL --</option>);
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
                <option key="ALL" value="ALL">-- ALL --</option>
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

    showMessage() {
        if (this.state.showMessage) {
            return (<p style={{ color: this.state.messageColor }}>{this.state.message}</p>);
        }
    }

    render() {
        if (this.state.loggedOut) {
            return (<Redirect to={{
                pathname: "/login",
                state: { loggedOut: true }
            }} />);
        }

        return (
            <div className="page-content">
                <h1>Explore Theater</h1>
                {this.showMessage()}
                <div className="vertical-list">
                    <div className="input-field">
                        Theater Name: {this.theaterDropdown()}
                    </div>
                    <div className="input-field">
                        Company Name: {this.companyDropdown()}
                    </div>
                    <div className="input-field">
                        City: <input type="text" name="city" id="city" />
                    </div>
                    <div className="input-field">
                        State: {this.stateDropdown()}
                    </div>
                </div>
                <div className="button-group">
                    <div className="button" onClick={this.filterTheaters} > Filter</div>
                </div>
                {this.theaterList()}
                <div className="button-group">
                    <Link to="/functionality" className="button">Back</Link>
                    <div className="input-field">
                        Visit Date: <input type="date" name="visitDate" id="visitDate" />
                    </div>
                    <div className="button" onClick={this.visitTheater}>Log Visit</div>
                </div>
            </div>
        );
    }
}