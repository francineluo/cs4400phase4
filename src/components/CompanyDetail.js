import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: this.props.location.state.company,
            employees: [],
            theaters: []
        }
    }

    componentDidMount() {
        if (typeof this.state.company !== "undefined") {
            this.getEmployees();
            this.getTheaters();
        }
    }

    getEmployees() {
        fetch("/api/admin_view_comDetail_emp?comName=" + this.state.company)
            .then(response => response.json())
            .then(fetch("/api/get_company_employees")
                .then(response => response.json())
                .then(data => this.setState({ employees: data }, this.listEmployees)));
    }

    getTheaters() {
        fetch("/api/admin_view_comDetail_th?comName=" + this.state.company)
            .then(response => response.json())
            .then(fetch("/api/get_comDetail_theaters")
            .then(response => response.json())
            .then(data => this.setState({ theaters: data }, this.theaterList)));
    }

    listEmployees() {
        let list = "";
        for (let i = 0; i < this.state.employees.length; i++) {
            let fname = this.state.employees[i].empFirstname;
            let lname = this.state.employees[i].empLastname;
            list = list.concat(fname, " ", lname);
            if (i < this.state.employees.length - 1) {
                list = list.concat(", ");
            }
        }
        return list;
    }

    theaterList() {
        let elements = [];
        for (let i = 0; i < this.state.theaters.length; i++) {
            let theater = this.state.theaters[i];
            let thName = theater.thName;
            elements.push(
                <tr key={thName}>
                    <td>{thName}</td>
                    <td>{theater.thManagerUsername}</td>
                    <td>{theater.thCity}</td>
                    <td>{theater.thState}</td>
                    <td>{theater.thCapacity}</td>
                </tr>
            );
        }

        if (elements.length === 0) {
            return (<p>No theaters found.</p>);
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Manager</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Capacity</th>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }

    render() {
        if (typeof this.state.company === "undefined") {
            return (
                <div className="page-content">
                    <p>You have not selected a company to view details for.</p>
                    <p>Go back to the company management page and try again.</p>
                    <div className="button-group">
                        <Link to="/managecompany" className="button">Back</Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="page-content">
                <h1>Company Detail</h1>
                <p className="left-aligned"><b>Name:&nbsp;</b>{this.state.company}</p>
                <p className="left-aligned"><b>Employees:&nbsp;</b>{this.listEmployees()}</p>
                <p><b>Theaters</b></p>
                {this.theaterList()}
                <div className="button-group">
                    <Link to="/managecompany" className="button">Back</Link>
                </div>
            </div>
        );
    }
}