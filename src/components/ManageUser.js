import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: StaticData.getAllUsernames(),
            filterUsername: "",
            filterStatus: ""
        }
        this.updateUsers = this.updateUsers.bind(this);
        this.filter = this.filter.bind(this);
        this.approve = this.approve.bind(this);
        this.decline = this.decline.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.userList = this.userList.bind(this);
    }

    updateUsers() {
        this.setState({
            users: StaticData.getAllUsernames()
        });
    }

    filter() {
        this.setState({
            filterUsername: document.getElementById("username").value,
            filterStatus: document.getElementById("status").value
        });
    }

    approve() {
        let selectedUsers = this.getSelectedUsers();
        for (let i in selectedUsers) {
            let username = selectedUsers[i];
            StaticData.setStatus(username, "Approved");
        }
        this.updateUsers();
        this.uncheckAll();
    }

    decline() {
        let selectedUsers = this.getSelectedUsers();
        for (let i in selectedUsers) {
            let username = selectedUsers[i];
            if (StaticData.getStatus(username) !== "Approved") {
                StaticData.setStatus(username, "Declined");
            }
        }
        this.updateUsers();
        this.uncheckAll();
    }

    getSelectedUsers() {
        let checkboxes = document.getElementsByName("checkbox");
        let selectedUsers = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].value !== "selectAll" && checkboxes[i].checked) {
                selectedUsers.push(checkboxes[i].value);
            }
        }
        return selectedUsers;
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

    statusDropdown() {
        return (
            <select name="status" id="status">
                <option value="All" defaultValue>All</option>
                <option value="Pending">Pending</option>
                <option value="Declined">Declined</option>
                <option value="Approved">Approved</option>
            </select>
        );
    }

    userList() {
        let elements = [];
        for (let i in this.state.users) {
            let username = this.state.users[i];
            let filterName = this.state.filterUsername;
            let userStatus = StaticData.getStatus(username);
            let filterStatus = this.state.filterStatus;
            if (username.includes(filterName) &&
                (filterStatus === "All" || userStatus.includes(filterStatus))) {
                let userTypeArr = StaticData.getUserType(username);
                let userType;
                if (userTypeArr[0] && userTypeArr[1]) {
                    userType = "Admin-Customer";
                } else if (userTypeArr[0]) {
                    userType = "Admin-Only";
                } else if (userTypeArr[1] && userTypeArr[2]) {
                    userType = "Manager-Customer";
                } else if (userTypeArr[1]) {
                    userType = "Customer";
                } else if (userTypeArr[2]) {
                    userType = "Manager-Only";
                } else {
                    userType = "User";
                }
                let substringIndex = username.indexOf(filterName);
                let uname1 = username.slice(0, substringIndex);
                let uname2 = username.slice(substringIndex + filterName.length, username.length);
                elements.push(
                    <tr key={username}>
                        <td><input type="checkbox" name="checkbox" value={username} /></td>
                        <td>{uname1}<b>{filterName}</b>{uname2}</td>
                        <td>{StaticData.getCreditCardCount(username)}</td>
                        <td>{userType}</td>
                        <td>{userStatus}</td>
                    </tr>
                );
            }
        }

        if (elements.length === 0) {
            return (<p>No users found. Try changing the filters.</p>);
        }

        //TODO: make columns sortable
        return (
            <table>
                <tbody>
                    <tr>
                        <th><input type="checkbox" name="checkbox" value="selectAll" id="selectAll" onClick={this.selectAll} /></th>
                        <th>Username</th>
                        <th>Credit Card Count</th>
                        <th>User Type</th>
                        <th>Status</th>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="page-content">
                <h1>Manage User</h1>
                <div className="vertical-list">
                    <div className="horizontal-list">
                        <div className="input-field">
                            Username: <input type="text" name="username" id="username" />
                        </div>
                        <div className="input-field">
                            Status: {this.statusDropdown()}
                        </div>
                    </div>
                    <div className="button-group">
                        <div className="button" onClick={this.filter}>Filter</div>
                        <div className="button" onClick={this.approve}>Approve</div>
                        <div className="button" onClick={this.decline}>Decline</div>
                    </div>
                    {this.userList()}
                    <div className="button-group">
                        <Link to="/functionality" className="button">Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}