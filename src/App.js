import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import MasterRouter from './components/MasterRouter';

export default class App extends Component {
    render() {
        return (
            <Router>
                <MasterRouter />
            </Router>
        );
    }
}