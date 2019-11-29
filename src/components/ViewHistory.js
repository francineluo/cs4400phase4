import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class ViewHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            viewHistory: [],
            currentUser: StaticData.getCurrentUser()
        }
    }

    componentDidMount() {
        if (typeof this.state.currentUser === "undefined") {
            this.setState({
                loggedOut: true
            });
        } else {
            this.getViewHistory();
        }
    }

    getViewHistory() {
        fetch("/api/customer_view_history?username=" + this.state.currentUser.username)
            .then(response => response.json())
            .then(data => this.verifyData(data));

        fetch("/api/get_customer_view_history")
            .then(response => response.json())
            .then(data => {
                if (this.verifyData(data)) {
                    this.setState({ viewHistory: data }, this.render);
                }
            });
    }

    verifyData(data) {
        if (typeof data.error !== "undefined") {
            this.setState({
                showMessage: true,
                message: "There was a problem trying to retrieve data",
                messageColor: "red"
            });
            return false;
        }
        return true;
    }

    showViewHistory() {
        let elements = [];
        for (let i = 0; i < this.state.viewHistory.length; i++) {
            let view = this.state.viewHistory[i];
            elements.push(
                <tr key={view.movName + view.creditCardNum + view.movPlayDate}>
                    <td>{view.movName}</td>
                    <td>{view.thName}</td>
                    <td>{view.comName}</td>
                    <td>{view.creditCardNum}</td>
                    <td>{view.movPlayDate.substring(0, view.movPlayDate.indexOf("T"))}</td>
                </tr>
            );
        }

        if (elements.length === 0) {
            return (<p>No view history.</p>);
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th>Movie</th>
                        <th>Theater</th>
                        <th>Company</th>
                        <th>Card#</th>
                        <th>View Date</th>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
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
                <h1>View History</h1>
                {this.showViewHistory()}
                <div className="button-group">
                    <Link to="/functionality" className="button">Back</Link>
                </div>
            </div>
        );
    }
}