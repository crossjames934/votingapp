// Dependencies
import React, { Component } from 'react';
import './App.css';
import VotingImg from './voting.jpg';

// My Modules
import AuthenticationSegment from './AuthenticationSegment';
import Intro from './Intro';
import PollMenu from './PollMenu';

// Global variables for string-references of widgets, for consistency and efficiency in development
const INTRO = "intro";
const POLLMENU = "pollMenu";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            username: "",
            visibleWidgets: [INTRO, POLLMENU]
        }
    }

    render() {
        const orderOf = widgetName => this.state.visibleWidgets.indexOf(widgetName);
        const showing = widgetName => this.state.visibleWidgets.includes(widgetName);
        return (
            <div className="App">
                <header className="App-header">
                    <img className={"votingImg"} src={VotingImg} alt={"Page logo - picture of someone voting"}/>
                    <h1 id={"mainTitle"}>Voting App</h1>
                    <AuthenticationSegment
                        authenticated={this.state.authenticated}
                        username={this.state.username}
                    />
                </header>
                <main>
                    <Intro
                        order={orderOf(INTRO)}
                        showing={showing(INTRO)}
                    />
                    <PollMenu
                        order={orderOf(POLLMENU)}
                        showing={showing(POLLMENU)}
                    />
                </main>
            </div>
        );
    }
}

export default App;
