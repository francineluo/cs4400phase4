import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/Main.css';
import StaticData from '../data/StaticData';

export default class TheaterOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            loggedOut: false,
            showMessage: false,
            message: "",
            movies: [],
            currentUser: StaticData.getCurrentUser()
        }
        this.filterMovies = this.filterMovies.bind(this);
    }

    componentDidMount() {
        if (typeof this.state.currentUser === "undefined") {
            this.setState({
                loggedOut: true
            });
        } else {
            this.filterMovies();
        }
    }

    filterMovies() {
        var url = new URL("http://" + window.location.host + "/api/manager_filter_th");
        var params = {
            manager: this.state.currentUser.username,
            movie: document.getElementById("name").value,
            minDuration: document.getElementById("minDuration").value,
            maxDuration: document.getElementById("maxDuration").value,
            minReleaseDate: document.getElementById("minReleaseDate").value,
            maxReleaseDate: document.getElementById("maxReleaseDate").value,
            minPlayDate: document.getElementById("minPlayDate").value,
            maxPlayDate: document.getElementById("maxPlayDate").value,
            includeNotPlayed: document.getElementById("includeNotPlayed").checked,
        };
        url.search = new URLSearchParams(params).toString();

        fetch(url)
            .then(response => response.json());

        fetch("/api/get_filtered_movies")
            .then(response => response.json())
            .then(data => this.setState({ movies: data }));
    }

    movieList() {
        let elements = [];
        for (let i = 0; i < this.state.movies.length; i++) {
            let movie = this.state.movies[i];
            let movName = movie.movName;
            let movReleaseDate = movie.movReleaseDate;
            movReleaseDate = movReleaseDate.substring(0, movReleaseDate.indexOf("T"));
            let movPlayDate = movie.movPlayDate;
            if (movPlayDate !== null) {
                movPlayDate = movPlayDate.substring(0, movPlayDate.indexOf("T"));
            }
            elements.push(
                <tr key={movName}>
                    <td>{movName}</td>
                    <td>{movie.movDuration}</td>
                    <td>{movReleaseDate}</td>
                    <td>{movPlayDate}</td>
                </tr>
            );
        }

        if (elements.length === 0) {
            return (<p>No movies found. Try changing the filters.</p>);
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <th>Movie Name</th>
                        <th>Duration</th>
                        <th>Release Date</th>
                        <th>Play Date</th>
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
                <h1>Theater Overview</h1>
                <div className="vertical-list">
                    <div className="input-field">
                        Movie Name: <input type="text" name="name" id="name" />
                    </div>
                    <div className="input-field">
                        Movie Duration: <div className="input-num-group"><input type="number" name="duration" id="minDuration" /> to <input type="number" name="duration" id="maxDuration" /></div>
                    </div>
                    <div className="input-field">
                        Movie Release Date: <div className="input-num-group"><input type="date" name="releasedate" id="minReleaseDate" /> to <input type="date" name="releasedate" id="maxReleaseDate" /></div>
                    </div>
                    <div className="input-field">
                        Movie Play Date: <div className="input-num-group"><input type="date" name="playdate" id="minPlayDate" /> to <input type="date" name="playdate" id="maxPlayDate" /></div>
                    </div>
                    <div><input type="checkbox" name="checkbox" id="includeNotPlayed" />Only Include Not Played Movies</div>
                </div>
                <div className="button-group">
                    <div className="button" onClick={this.filterMovies}>Filter</div>
                </div>
                {this.movieList()}
                <div className="button-group">
                    <Link to="/functionality" className="button">Back</Link>
                </div>
            </div>
        );
    }
}