// Dependencies
import React, { Component } from 'react';
import './stylesheets/App.css';
import VotingImg from './images/voting.jpg';

// My Modules
import AuthenticationSegment from './components/AuthenticationSegment';
import Intro from './components/Intro';
import PollMenu from './components/PollMenu';
import Register from './components/Register';

// Global variables for string-references of widgets, for consistency and efficiency in development
const INTRO = "intro";
const POLLMENU = "pollMenu";
const REGISTER = "register";
const LOGIN = "login";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            username: "",
            visibleWidgets: [INTRO, POLLMENU]
        };
        this.closeWidget = this.closeWidget.bind(this);
        this.showWidget = this.showWidget.bind(this);
    }

    closeWidget(widgetName) {
        this.setState({visibleWidgets: this.state.visibleWidgets.filter(widget => widget !== widgetName)});
    }

    showWidget(widgetName) {
        this.setState({visibleWidgets: [widgetName, ...this.state.visibleWidgets]});
    }

    render() {
        // Everything in <main> is divided into 'widgets'
        // Each widget displays according to a particular order, if at all
        // The two function expressions below determine whether it is showing, and what order it is if so
        // These are passed as props to each component, or 'widget'
        const orderOf = widgetName => this.state.visibleWidgets.indexOf(widgetName);
        const showing = widgetName => this.state.visibleWidgets.includes(widgetName);
        return (
            <div className="App">
                <header className="App-header">
                    <img className={"votingImg"} src={VotingImg} alt={"someone voting"}/>
                    <h1 id={"mainTitle"}>Voting App</h1>
                    <AuthenticationSegment
                        authenticated={this.state.authenticated}
                        username={this.state.username}
                        showRegister={() => this.showWidget(REGISTER)}
                        showLogin={() => this.showWidget(LOGIN)}
                    />
                </header>
                <main>
                    <Intro
                        order={orderOf(INTRO)}
                        showing={showing(INTRO)}
                        close={() => {this.closeWidget(INTRO)}}
                    />
                    <PollMenu
                        order={orderOf(POLLMENU)}
                        showing={showing(POLLMENU)}
                        close={() => {this.closeWidget(POLLMENU)}}
                    />
                    <Register
                        order={orderOf(REGISTER)}
                        showing={showing(REGISTER)}
                        close={() => {this.closeWidget(REGISTER)}}
                    />
                </main>
            </div>
        );
    }
}

export default App;
