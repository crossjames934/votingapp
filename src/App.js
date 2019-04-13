// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import './stylesheets/App.css';
// import VotingImg from './images/voting.jpg';

// My Modules
import AuthenticationSegment from './components/AuthenticationSegment';
import MainMenu from './components/MainMenu';
import Intro from './components/Intro';
import PollMenu from './components/PollMenu';
import CreateNewPoll from './components/CreateNewPoll';
import ShowPoll from './components/ShowPoll';
import Register from './components/Register';
import Login from './components/Login';

// Global variables for string-references of widgets, for consistency and efficiency in development
const INTRO = "Intro";
const MAIN_MENU = "Main Menu";
const POLL_MENU = "Poll Menu";
const REGISTER = "Register";
const LOGIN = "Login";
const CREATE_NEW_POLL = "Create New Poll";
const SHOW_POLL = "Show Poll";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            username: "",
            visibleWidgets: [INTRO, POLL_MENU],
            attemptedLogin: false,
            showingPollId: ""
        };
        this.closeWidget = this.closeWidget.bind(this);
        this.showWidget = this.showWidget.bind(this);
        this.updateParentState = this.updateParentState.bind(this);
        this.bringMenuToFront = this.bringMenuToFront.bind(this);
    }

    componentDidMount() {
        // Check if user is already logged in to display components accordingly (i.e. Welcome message)
        axios.get('/whoami')
            .then(res => {
                if (res.data) {
                    this.setState({authenticated: true, username: res.data});
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateParentState(stateObject) {
        this.setState(stateObject);
    }

    closeWidget(widgetName) {
        this.setState({visibleWidgets: this.state.visibleWidgets.filter(widget => widget !== widgetName)});
    }

    showWidget(widgetName) {
        const containsMenu = this.state.visibleWidgets.includes(MAIN_MENU);
        const otherWidgets = this.state.visibleWidgets.filter(widget => widget !== MAIN_MENU);
        const updateArray = [widgetName, ...otherWidgets];
        if (containsMenu) updateArray.unshift(MAIN_MENU);
        this.setState({visibleWidgets: updateArray});
    }

    bringMenuToFront() {
        const otherWidgets = this.state.visibleWidgets.filter(widget => widget !== MAIN_MENU);
        this.setState({visibleWidgets: [MAIN_MENU, ...otherWidgets]});
    }

    // componentDidUpdate() {
    //     const widgets = document.getElementsByClassName('widget');
    //     for (let i = 0; i < widgets.length; i++) {
    //         const el = widgets[i];
    //         const curOverflow = el.style.overflow;
    //
    //         if ( !curOverflow || curOverflow === "visible" )
    //             el.style.overflow = "hidden";
    //
    //         let isOverflowing = el.clientWidth < el.scrollWidth
    //             || el.clientHeight < el.scrollHeight;
    //
    //         el.style.overflowY = isOverflowing ? "scroll" : "hidden";
    //     }
    // }

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
                    <p className={"hamburgerIcon"} onClick={() => { this.showWidget(MAIN_MENU) }}>&#9776;</p>
                    <h1 id={"mainTitle"}>Voting App</h1>
                    <AuthenticationSegment
                        authenticated={this.state.authenticated}
                        username={this.state.username}
                        showRegister={() => this.showWidget(REGISTER)}
                        showLogin={() => this.showWidget(LOGIN)}
                        updateParentState={this.updateParentState}
                    />
                </header>
                <main>
                    <MainMenu
                        widgets={[INTRO, POLL_MENU, CREATE_NEW_POLL, REGISTER, LOGIN]}
                        order={orderOf(MAIN_MENU)}
                        showing={showing(MAIN_MENU)}
                        close={() => {this.closeWidget(MAIN_MENU)}}
                        visibleWidgets={this.state.visibleWidgets}
                        showWidget={this.showWidget}
                        closeWidget={this.closeWidget}
                        bringMenuToFront={this.bringMenuToFront}
                        authenticated={this.state.authenticated}
                        id={MAIN_MENU.replace(/\s/g, "")}
                    />
                    <Intro
                        order={orderOf(INTRO)}
                        showing={showing(INTRO)}
                        close={() => {this.closeWidget(INTRO)}}
                        id={INTRO.replace(/\s/g, "")}
                    />
                    <PollMenu
                        order={orderOf(POLL_MENU)}
                        showing={showing(POLL_MENU)}
                        close={() => {this.closeWidget(POLL_MENU)}}
                        showPoll={() => this.showWidget(SHOW_POLL)}
                        updateParentState={this.updateParentState}
                        id={POLL_MENU.replace(/\s/g, "")}
                    />
                    <CreateNewPoll
                        order={orderOf(CREATE_NEW_POLL)}
                        showing={showing(CREATE_NEW_POLL)}
                        close={() => {this.closeWidget(CREATE_NEW_POLL)}}
                        authenticated={this.state.authenticated}
                        username={this.state.username}
                        id={CREATE_NEW_POLL.replace(/\s/g, "")}
                    />
                    <ShowPoll
                        order={orderOf(SHOW_POLL)}
                        showing={showing(SHOW_POLL)}
                        close={() => {this.closeWidget(SHOW_POLL)}}
                        pollId={this.state.showingPollId}
                        authenticated={this.state.authenticated}
                        username={this.state.username}
                        id={SHOW_POLL.replace(/\s/g, "")}
                    />
                    <Register
                        order={orderOf(REGISTER)}
                        showing={showing(REGISTER)}
                        close={() => {this.closeWidget(REGISTER)}}
                        id={REGISTER.replace(/\s/g, "")}
                    />
                    <Login
                        order={orderOf(LOGIN)}
                        showing={showing(LOGIN)}
                        close={() => {this.closeWidget(LOGIN)}}
                        authenticated={this.state.authenticated}
                        attemptedLogin={this.state.attemptedLogin}
                        updateParentState={this.updateParentState}
                        id={LOGIN.replace(/\s/g, "")}
                    />
                    <p className={"noWidgetMsg"} onClick={() => { this.showWidget(MAIN_MENU) }}>
                        {this.state.visibleWidgets.length === 0 ? "Click here or ☰ for the menu" : ""}
                    </p>
                </main>
            </div>
        );
    }
}

export default App;
