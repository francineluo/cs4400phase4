import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import SortIcon from '../sort-solid.svg';
import SortUpIcon from '../sort-up-solid.svg';
import SortDownIcon from '../sort-down-solid.svg';

export default class ManageCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectPath: "",
            selected: "",
            showMessage: false,
            message: "",
            companies: [],
            sortBy: "",
            sortDirection: "",
            nameSortIcon: SortIcon,
            citySortIcon: SortIcon,
            theaterSortIcon: SortIcon,
            employeeSortIcon: SortIcon
        }
        this.filterCompanies = this.filterCompanies.bind(this);
        this.createTheater = this.createTheater.bind(this);
        this.companyDetail = this.companyDetail.bind(this);
        this.sort = this.sort.bind(this);
        this.companyList = this.companyList.bind(this);
    }

    componentDidMount() {
        this.filterCompanies();
    }

    filterCompanies() {
        var url = new URL("http://" + window.location.host + "/api/admin_filter_company");
        var params = {
            comName: document.getElementById("name").value || "ALL",
            minCity: document.getElementById("cityMin").value,
            maxCity: document.getElementById("cityMax").value,
            minTheater: document.getElementById("theaterMin").value,
            maxTheater: document.getElementById("theaterMax").value,
            minEmployee: document.getElementById("employeeMin").value,
            maxEmployee: document.getElementById("employeeMax").value,
            sortBy: this.state.sortBy,
            sortDirection: this.state.sortDirection
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json());

        fetch("/api/get_filtered_companies")
            .then(response => response.json())
            .then(data => this.setState({ companies: data }));
    }

    createTheater() {
        this.setState({
            redirect: true,
            redirectPath: "/createtheater",
            selected: this.getSelectedCompany()
        });
    }

    companyDetail() {
        this.setState({
            redirect: true,
            redirectPath: "/companydetail",
            selected: this.getSelectedCompany()
        });
    }

    getSelectedCompany() {
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

    sort(e) {
        let sortBy = e.target.id;
        let sortDir = "";
        let sortIcon = SortIcon;
        if (this.state.sortBy !== sortBy || this.state.sortDirection === "") {
            sortDir = "DESC";
            sortIcon = SortDownIcon;
        } else if (this.state.sortDirection === "DESC") {
            sortDir = "ASC";
            sortIcon = SortUpIcon;
        } else if (this.state.sortDirection === "ASC") {
            sortBy = "";
            sortDir = "";
            sortIcon = SortIcon;
        }
        if (sortBy === "") {
            this.setState({
                nameSortIcon: SortIcon,
                citySortIcon: SortIcon,
                theaterSortIcon: SortIcon,
                employeeSortIcon: SortIcon
            });
        } else if (sortBy === "comName") {
            this.setState({
                nameSortIcon: sortIcon,
                citySortIcon: SortIcon,
                theaterSortIcon: SortIcon,
                employeeSortIcon: SortIcon
            });
        } else if (sortBy === "numCityCover") {
            this.setState({
                nameSortIcon: SortIcon,
                citySortIcon: sortIcon,
                theaterSortIcon: SortIcon,
                employeeSortIcon: SortIcon
            });
        } else if (sortBy === "numTheater") {
            this.setState({
                nameSortIcon: SortIcon,
                citySortIcon: SortIcon,
                theaterSortIcon: sortIcon,
                employeeSortIcon: SortIcon
            });
        } else if (sortBy === "numEmployee") {
            this.setState({
                nameSortIcon: SortIcon,
                citySortIcon: SortIcon,
                theaterSortIcon: SortIcon,
                employeeSortIcon: sortIcon
            });
        }
        this.setState({
            sortBy: sortBy,
            sortDirection: sortDir
        });
        this.filterCompanies();
    }

    companyList() {
        let elements = [];
        for (let i = 0; i < this.state.companies.length; i++) {
            let company = this.state.companies[i];
            let companyName = company.comName;
            if (i === 0) {
                elements.push(
                    <tr key={companyName}>
                        <td><input type="radio" name="radio" value={companyName} defaultChecked /></td>
                        <td>{companyName}</td>
                        <td>{company.numCityCover}</td>
                        <td>{company.numTheater}</td>
                        <td>{company.numEmployee}</td>
                    </tr>
                );
            } else {
                elements.push(
                    <tr key={companyName}>
                        <td><input type="radio" name="radio" value={companyName} /></td>
                        <td>{companyName}</td>
                        <td>{company.numCityCover}</td>
                        <td>{company.numTheater}</td>
                        <td>{company.numEmployee}</td>
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
                        <th></th>
                        <th>Name <img src={this.state.nameSortIcon} alt="sort" id="comName" height="16px" onClick={e => this.sort(e)} /></th>
                        <th>#City Covered <img src={this.state.citySortIcon} alt="sort" id="numCityCover" height="16px" onClick={e => this.sort(e)} /></th>
                        <th>#Theaters <img src={this.state.theaterSortIcon} alt="sort" id="numTheater" height="16px" onClick={e => this.sort(e)} /></th>
                        <th>#Employees <img src={this.state.employeeSortIcon} alt="sort" id="numEmployee" height="16px" onClick={e => this.sort(e)} /></th>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }

    showMessage() {
        if (this.state.showMessage) {
            return (<p style={{ color: "red" }}>{this.state.message}</p>);
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: this.state.redirectPath, state: { company: this.state.selected }
            }} />);
        }

        return (
            <div className="page-content">
                <h1>Manage Company</h1>
                {this.showMessage()}
                <div className="vertical-list">
                    <div className="centered">
                        <div className="input-field">
                            Name: <input type="text" name="name" id="name" />
                        </div>
                        <div className="input-field">
                            #City Covered: <div className="input-num-group"><input type="number" name="cities" id="cityMin" /> to <input type="number" name="cities" id="cityMax" /></div>
                        </div>
                        <div className="input-field">
                            #Theaters: <div className="input-num-group"><input type="number" name="theaters" id="theaterMin" /> to <input type="number" name="theaters" id="theaterMax" /></div>
                        </div>
                        <div className="input-field">
                            #Employees: <div className="input-num-group"><input type="number" name="employees" id="employeeMin" /> to <input type="number" name="employees" id="employeeMax" /></div>
                        </div>
                    </div>
                    <div className="button-group">
                        <div className="button" onClick={this.filterCompanies} > Filter</div>
                        <div className="button" onClick={this.createTheater}>Create Theater</div>
                        <div className="button" onClick={this.companyDetail}>Detail</div>
                    </div>
                    {this.companyList()}
                    <div className="button-group">
                        <Link to="/functionality" className="button">Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}