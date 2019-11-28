import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class ExploreMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showMessage: false,
            message: "",
            messageColor: "red",
            allMovies: [],
            allCompanies: [],
            creditCards: [],
            filteredMovies: [],
            currentUser: StaticData.getCurrentUser()
        }
        this.filterMovies = this.filterMovies.bind(this);
        this.viewMovie = this.viewMovie.bind(this);
        this.verifyData = this.verifyData.bind(this);
    }

    componentDidMount() {
        if (typeof this.state.currentUser === "undefined") {
            this.setState({
                loggedOut: true
            });
        } else {
            this.getAllMovies();
            this.getAllCompanies();
            this.getCardNumbers();
            this.filterMovies();
        }
    }

    getAllMovies() {
        fetch("/api/get_all_movies")
            .then(response => response.json())
            .then(data => this.setState({ allMovies: data }));
    }

    getAllCompanies() {
        fetch("/api/get_all_companies")
            .then(response => response.json())
            .then(data => this.setState({ allCompanies: data }));
    }

    getCardNumbers() {
        fetch("/api/customer_get_cards?username=" + this.state.currentUser.username)
            .then(response => response.json())
            .then(data => this.setState({ creditCards: data }));
    }

    filterMovies() {
        var url = new URL("http://" + window.location.host + "/api/customer_filter_mov");
        var params = {
            movie: document.getElementById("movie").value,
            company: document.getElementById("company").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            minPlayDate: document.getElementById("minPlayDate").value,
            maxPlayDate: document.getElementById("maxPlayDate").value
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json());

        fetch("/api/get_customer_filtered_mov")
            .then(response => response.json())
            .then(data => this.setState({ filteredMovies: data }));
    }

    viewMovie() {
        //TODO: customer can only watch up to 3 movies per day
        let selectedMovie = this.getSelectedMovie();
        let movieInfo = selectedMovie.split(" --- ");
        var url = new URL("http://" + window.location.host + "/api/customer_view_mov");
        var params = {
            creditCard: document.getElementById("creditCard").value,
            movie: movieInfo[0],
            releaseDate: movieInfo[1],
            theater: movieInfo[2],
            company: movieInfo[3],
            playDate: movieInfo[4]
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
                message: "Movie was successfully viewed",
                messageColor: "green"
            });
        } else {
            this.setState({
                showMessage: true,
                message: "There was a problem trying to create the movie",
                messageColor: "red"
            });
        }
    }

    getSelectedMovie() {
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

    movieList() {
        let elements = [];
        for (let i = 0; i < this.state.filteredMovies.length; i++) {
            let movie = this.state.filteredMovies[i];
            let movName = movie.movName;
            let releaseDate = movie.movReleaseDate.substring(0, movie.movReleaseDate.indexOf("T"));
            let theater = movie.thName;
            let address = movie.thStreet.concat(", ", movie.thCity, ", ", movie.thState, " ", movie.thZipcode);
            let comName = movie.comName
            let playDate = movie.movPlayDate.substring(0, movie.movPlayDate.indexOf("T"));
            let keyArr = [movName, releaseDate, theater, comName, playDate];
            let key = keyArr.join(" --- ");
            if (i === 0) {
                elements.push(
                    <tr key={key}>
                        <td><input type="radio" name="radio" value={key} defaultChecked /></td>
                        <td>{movName}</td>
                        <td>{movie.thName}</td>
                        <td>{address}</td>
                        <td>{comName}</td>
                        <td>{playDate}</td>
                    </tr>
                );
            } else {
                elements.push(
                    <tr key={key}>
                        <td><input type="radio" name="radio" value={key} /></td>
                        <td>{movName}</td>
                        <td>{movie.thName}</td>
                        <td>{address}</td>
                        <td>{comName}</td>
                        <td>{playDate}</td>
                    </tr>
                );
            }
        }

        if (elements.length === 0) {
            return (<p>No movies found. Try changing the filters.</p>);
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Movie</th>
                        <th>Theater</th>
                        <th>Address</th>
                        <th>Company</th>
                        <th>Play Date</th>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }

    movieDropdown() {
        let elements = [];
        elements.push(<option key="ALL" value="ALL">-- ALL --</option>);
        for (let i in this.state.allMovies) {
            let movie = this.state.allMovies[i].movName;
            elements.push(
                <option key={movie} value={movie}>{movie}</option>
            );
        }

        return (
            <select name="movie" id="movie">
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

    cardDropdown() {
        let elements = [];
        for (let i in this.state.creditCards) {
            let creditCard = this.state.creditCards[i].creditCardNum;
            elements.push(
                <option key={creditCard} value={creditCard}>{creditCard}</option>
            );
        }

        return (
            <select name="creditCard" id="creditCard">
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
                <h1>Explore Movie</h1>
                {this.showMessage()}
                <div className="vertical-list">
                    <div className="input-field">
                        Movie Name: {this.movieDropdown()}
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
                    <div className="input-field">
                        Movie Play Date: <div className="input-num-group"><input type="date" name="playdate" id="minPlayDate" /> to <input type="date" name="playdate" id="maxPlayDate" /></div>
                    </div>
                </div>
                <div className="button-group">
                    <div className="button" onClick={this.filterMovies} > Filter</div>
                </div>
                {this.movieList()}
                <div className="button-group">
                    <Link to="/functionality" className="button">Back</Link>
                    <div className="input-field">
                        Card Number: {this.cardDropdown()}
                    </div>
                    <div className="button" onClick={this.viewMovie}>View</div>
                </div>
            </div>
        );
    }
}