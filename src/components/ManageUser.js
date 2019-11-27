import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Main.css';
import SortIcon from '../sort-solid.svg';
import SortUpIcon from '../sort-up-solid.svg';
import SortDownIcon from '../sort-down-solid.svg';

export default class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            sortBy: "",
            sortDirection: "",
            nameSortIcon: SortIcon,
            cardSortIcon: SortIcon,
            typeSortIcon: SortIcon,
            statusSortIcon: SortIcon
        }
        this.filterUsers = this.filterUsers.bind(this);
        this.approve = this.approve.bind(this);
        this.decline = this.decline.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.sort = this.sort.bind(this);
        this.userList = this.userList.bind(this);
    }

    componentDidMount() {
        this.filterUsers();
    }

    filterUsers() {
        var url = new URL("http://" + window.location.host + "/api/admin_filter_user");
        var params = {
            username: document.getElementById("usernameInput").value,
            status: document.getElementById("status").value,
            sortBy: this.state.sortBy,
            sortDirection: this.state.sortDirection
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json());

        fetch("/api/get_filtered_users")
            .then(response => response.json())
            .then(data => this.setState({ users: data }));
    }

    approve() {
        let selectedUsers = this.getSelectedUsers();
        for (let i in selectedUsers) {
            let username = selectedUsers[i];
            fetch("/api/admin_approve_user?username=" + username)
                .then(response => response.json());
        }
        this.filterUsers();
        this.uncheckAll();
    }

    decline() {
        let selectedUsers = this.getSelectedUsers();
        for (let i in selectedUsers) {
            let username = selectedUsers[i];
            fetch("/api/admin_decline_user?username=" + username)
                .then(response => response.json());
        }
        this.filterUsers();
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
                cardSortIcon: SortIcon,
                typeSortIcon: SortIcon,
                statusSortIcon: SortIcon
            });
        } else if (sortBy === "username") {
            this.setState({
                nameSortIcon: sortIcon,
                cardSortIcon: SortIcon,
                typeSortIcon: SortIcon,
                statusSortIcon: SortIcon
            });
        } else if (sortBy === "creditCardCount") {
            this.setState({
                nameSortIcon: SortIcon,
                cardSortIcon: sortIcon,
                typeSortIcon: SortIcon,
                statusSortIcon: SortIcon
            });
        } else if (sortBy === "userType") {
            this.setState({
                nameSortIcon: SortIcon,
                cardSortIcon: SortIcon,
                typeSortIcon: sortIcon,
                statusSortIcon: SortIcon
            });
        } else if (sortBy === "status") {
            this.setState({
                nameSortIcon: SortIcon,
                cardSortIcon: SortIcon,
                typeSortIcon: SortIcon,
                statusSortIcon: sortIcon
            });
        }
        this.setState({
            sortBy: sortBy,
            sortDirection: sortDir
        });
        this.filterUsers();
    }

    userList() {
        let elements = [];
        for (let i in this.state.users) {
            let user = this.state.users[i];
            let username = user.username;
            elements.push(
                <tr key={username}>
                    <td><input type="checkbox" name="checkbox" value={username} /></td>
                    <td>{username}</td>
                    <td>{user.creditCardCount}</td>
                    <td>{user.userType}</td>
                    <td>{user.status}</td>
                </tr>
            );
        }

        if (elements.length === 0) {
            return (<p>No users found. Try changing the filters.</p>);
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th><input type="checkbox" name="checkbox" value="selectAll" id="selectAll" onClick={this.selectAll} /></th>
                        <th>Username <img src={this.state.nameSortIcon} alt="sort" id="username" height="16px" onClick={e => this.sort(e)} /></th>
                        <th>Credit Card Count <img src={this.state.cardSortIcon} alt="sort" id="creditCardCount" height="16px" onClick={e => this.sort(e)} /></th>
                        <th>User Type <img src={this.state.typeSortIcon} alt="sort" id="userType" height="16px" onClick={e => this.sort(e)} /></th>
                        <th>Status <img src={this.state.statusSortIcon} alt="sort" id="status" height="16px" onClick={e => this.sort(e)} /></th>
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
                            Username: <input type="text" name="username" id="usernameInput" />
                        </div>
                        <div className="input-field">
                            Status: {this.statusDropdown()}
                        </div>
                    </div>
                    <div className="button-group">
                        <div className="button" onClick={this.filterUsers}>Filter</div>
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