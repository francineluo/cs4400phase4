import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class VisitHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMessage: false,
            message: "",
            visitHistory: [],
            allCompanies: [],
            currentUser: StaticData.getCurrentUser()
        }
        this.filterVisitHistory = this.filterVisitHistory.bind(this);
        this.verifyData = this.verifyData.bind(this);
    }

    componentDidMount() {
        if (typeof this.state.currentUser === "undefined") {
            this.setState({
                loggedOut: true
            });
        } else {
            this.getAllCompanies();
            this.filterVisitHistory();
        }
    }

    getAllCompanies() {
        fetch("/api/get_all_companies")
            .then(response => response.json())
            .then(data => this.setState({ allCompanies: data }));
    }

    filterVisitHistory() {
        this.setState({ showMessage: false });

        var url = new URL("http://" + window.location.host + "/api/user_filter_visitHistory");
        var params = {
            username: this.state.currentUser.username,
            minVisitDate: document.getElementById("minVisitDate").value,
            maxVisitDate: document.getElementById("maxVisitDate").value
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json())
            .then(data => this.verifyData(data));

        fetch("/api/get_user_visit_history?username=" + this.state.currentUser.username)
            .then(response => response.json())
            .then(data => this.verifyData(data));
    }

    verifyData(data) {
        if (typeof data.error !== "undefined") {
            if (data.error === "ER_TRUNCATED_WRONG_VALUE") {
                this.setState({
                    showMessage: true,
                    message: "Invalid visit date",
                    messageColor: "red"
                });
            } else {
                this.setState({
                    showMessage: true,
                    message: "There was a problem trying to retrieve data",
                    messageColor: "red"
                });
            }
        }
    }

    showVisitHistory() {
        let elements = [];
        for (let i = 0; i < this.state.visitHistory.length; i++) {
            let visit = this.state.visitHistory[i];
            let address = visit.thStreet.concat(", ", visit.thCity, ", ", visit.thState, " ", visit.thZipcode);
            elements.push(
                <tr key={visit}>
                    <td>{visit.thName}</td>
                    <td>{address}</td>
                    <td>{visit.comName}</td>
                    <td>{visit.visitDate}</td>
                </tr>
            );
        }

        if (elements.length === 0) {
            return (<p>No visit history.</p>);
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th>Theater</th>
                        <th>Address</th>
                        <th>Company</th>
                        <th>Visit Date</th>
                    </tr>
                    {elements}
                </tbody>
            </table>
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
                <h1>Visit History</h1>
                {this.showMessage()}
                <div className="vertical-list">
                    <div className="input-field">
                        Company Name: {this.companyDropdown()}
                    </div>
                    <div className="input-field">
                        Visit Date: <div className="input-num-group"><input type="date" name="minVisitDate" id="minVisitDate" /> to <input type="date" name="maxVisitDate" id="maxVisitDate" /></div>
                    </div>
                </div>
                <div className="button-group">
                    <div className="button" onClick={this.filterVisitHistory} > Filter</div>
                </div>
                {this.showVisitHistory()}
                <div className="button-group">
                    <Link to="/functionality" className="button">Back</Link>
                </div>
            </div>
        );
    }
}