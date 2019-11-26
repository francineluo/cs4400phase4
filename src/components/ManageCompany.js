import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';

export default class ManageCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            filterName: ""
        }
        this.selectAll = this.selectAll.bind(this);
        this.companyList = this.companyList.bind(this);
    }

    componentDidMount() {
        fetch('/api/allCompanies')
            .then(response => response.json())
            .then(data => this.setState({ companies: data }));
    }

    uncheckAll() {
        let checkboxes = document.getElementsByName("checkbox");
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }

    checkAll() {
        let checkboxes = document.getElementsByName("checkbox");
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    }

    selectAll() {
        let selectAll = document.getElementById("selectAll");
        if (selectAll.checked) {
            this.checkAll();
        } else {
            this.uncheckAll();
        }
    }

    companyList() {
        let elements = [];
        for (let i in this.state.companies) {
            let company = this.state.companies[i];
            let companyName = company.comName;
            let filterName = this.state.filterName;
            if (companyName.includes(filterName)) {
                elements.push(
                    <tr key={companyName}>
                        <td><input type="checkbox" name="checkbox" value={companyName} /></td>
                        <td>{companyName}</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                );
            }
        }

        if (elements.length === 0) {
            return (<p>No companies found. Try changing the filters.</p>);
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th><input type="checkbox" name="checkbox" value="selectAll" id="selectAll" onClick={this.selectAll} /></th>
                        <th>Name</th>
                        <th>#City Covered</th>
                        <th>#Theaters</th>
                        <th>#Employees</th>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="page-content">
                <h1>Manage Company</h1>
                <div className="vertical-list">
                    <div>
                        <div className="input-field">
                            Name: <input type="text" name="name" />
                        </div>
                        <div className="input-field">
                            #City Covered: <input type="text" name="cities" />
                        </div>
                        <div className="input-field">
                            #Theaters: <input type="text" name="theaters" />
                        </div>
                        <div className="input-field">
                            #Employees: <input type="text" name="employees" />
                        </div>
                    </div>
                    <div className="button-group">
                        <div className="button">Filter</div>
                        <div className="button">Create Theater</div>
                        <div className="button">Detail</div>
                    </div>
                    {this.companyList()}
                    <div className="button-group">
                        <Link to={{ pathname: "/functionality", state: { isAdmin: true } }} className="button">Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}