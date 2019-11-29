import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class ScheduleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            loggedOut: false,
            showMessage: false,
            message: "",
            messageColor: "red",
            managerTheater: [],
            allMovies: [],
            movieReleaseDate: "",
            response: null,
            currentUser: StaticData.getCurrentUser()
        }
        this.scheduleMovie = this.scheduleMovie.bind(this);
        this.verifyData = this.verifyData.bind(this);
        this.setMovieReleaseDate = this.setMovieReleaseDate.bind(this);
    }

    componentDidMount() {
        if (typeof this.state.currentUser === "undefined") {
            this.setState({
                loggedOut: true
            });
        } else {
            this.getManagerTheater();
            this.getAllMovies();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.managerTheater !== this.state.managerTheater) {
            if (this.state.managerTheater.length === 0) {
                this.setState({
                    showMessage: true,
                    message: "You are not currently assigned to a theater, so you cannot schedule movies.",
                    messageColor: "red"
                });
            } else {
                this.setState({ showMessage: false });
            }
        }
        if (prevState.allMovies !== this.state.allMovies) {
            this.setMovieReleaseDate();
        }
    }

    getManagerTheater() {
        fetch("/api/get_manager_theater?manager=" + this.state.currentUser.username)
            .then(response => response.json())
            .then(data => this.setState({ managerTheater: data }));
    }

    getAllMovies() {
        fetch("/api/get_all_movies")
            .then(response => response.json())
            .then(data => this.setState({ allMovies: data }, this.movieDropdown));
    }

    checkFields() {
        let movie = document.getElementById("movie").value;
        let releasedate = document.getElementById("releasedate").value;
        let playdate = document.getElementById("playdate").value;

        if (movie.length === 0 || releasedate.length === 0 || playdate.length === 0) {
            this.setState({
                showMessage: true,
                message: "Please fill out all fields",
                messageColor: "red"
            });
            return false;
        }

        var d1 = Date.parse(releasedate);
        var d2 = Date.parse(playdate);
        if (d1 > d2) {
            this.setState({
                showMessage: true,
                message: "Release date must come before play date",
                messageColor: "red"
            });
            return false;
        }

        return true;
    }

    scheduleMovie() {
        if (this.state.managerTheater.length !== 0 && this.checkFields()) {
            var url = new URL("http://" + window.location.host + "/api/manager_schedule_mov");
            var params = {
                manager: this.state.currentUser.username,
                movie: document.getElementById("movie").value,
                releasedate: document.getElementById("releasedate").value,
                playdate: document.getElementById("playdate").value
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json())
                .then(data => this.verifyData(data));
        }
    }

    verifyData(data) {
        if (typeof data.error === "undefined") {
            this.setState({
                showMessage: true,
                message: "Movie was successfully scheduled",
                messageColor: "green"
            });
        } else if (data.error === "ER_DUP_ENTRY") {
            this.setState({
                showMessage: true,
                message: "The movie is already scheduled for that play date",
                messageColor: "red"
            });
        } else if (data.error === "ER_TRUNCATED_WRONG_VALUE") {
            this.setState({
                showMessage: true,
                message: "Invalid input",
                messageColor: "red"
            });
        } else {
            this.setState({
                showMessage: true,
                message: "There was a problem trying to create the movie",
                messageColor: "red"
            });
        }
    }

    setMovieReleaseDate() {
        let movie = document.getElementById("movie").value;

        fetch("/api/get_movie_release_date?movie=" + movie)
            .then(response => response.json())
            .then(data => this.setState({
                movieReleaseDate: data[0].movReleaseDate.substring(0, data[0].movReleaseDate.indexOf("T"))
            }));
    }

    movieDropdown() {
        let elements = [];
        for (let i in this.state.allMovies) {
            let movie = this.state.allMovies[i].movName;
            elements.push(
                <option key={movie} value={movie}>{movie}</option>
            );
        }

        return (
            <select name="movie" id="movie" onChange={this.setMovieReleaseDate} >
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
                <h1>Schedule Movie</h1>
                {this.showMessage()}
                <div className="vertical-list">
                    <div className="input-field">
                        Name: {this.movieDropdown()}
                    </div>
                    <div className="input-field">
                        Release Date: <input type="date" name="releasedate" id="releasedate" value={this.state.movieReleaseDate} readOnly />
                    </div>
                    <div className="input-field">
                        Play Date: <input type="date" name="playdate" id="playdate" />
                    </div>
                </div>
                <div className="button-group">
                    <Link to="/functionality" className="button">Back</Link>
                    <div className="button" onClick={this.scheduleMovie}>Add</div>
                </div>
            </div>
        );
    }
}