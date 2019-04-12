import React, {Component} from 'react';
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            failedMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        this.props.updateParentState({attemptedLogin: true});
        this.setState({failedMessage: ""});
        const { username, password } = this.state;
        axios.post('/login', {username, password})
            .then((response) => {
                //handle success
                if (response.status !== 200) {
                    alert("There was a problem after connecting to the server, see console for more information");
                    return console.log(response);
                }
                if (response.data.loggedIn) {
                    // update log in status of parent
                    this.props.updateParentState({
                        authenticated: true,
                        username: response.data.message
                    });
                    // Must clear fields for cyber-security!
                    this.setState({
                        username: "",
                        password: ""
                    });
                    // close widget after 2 seconds
                    setTimeout(this.props.close, 2000);
                } else {
                    this.setState({failedMessage: response.data.message});
                    this.props.updateParentState({attemptedLogin: false});
                }
            })
            .catch((response) => {
                //handle error
                console.log(response);
                this.setState({
                    failedMessage: "Trouble connecting to server. Potentially from loss of internet connection. See console for more details"
                });
                this.props.updateParentState({attemptedLogin: false});
            });
        e.preventDefault();
    }

    attemptedLogin() {
        const message = this.props.authenticated ? "You have logged in successfully!" : "Please wait...";
        return(
            <div>
                <p>{message}</p>
            </div>
        );
    }

    loginForm() {
        const spaceAround = {
            display: "flex",
            justifyContent: "space-between",
            margin: '10px 0'
        };
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div style={spaceAround}>
                        <p>Username:</p>
                        <input
                            onChange={this.handleChange}
                            name="username"
                            type="text"
                            id="loginUsername"
                            value={this.state.username}
                            required
                        />
                    </div>
                    <div style={spaceAround}>
                        <p>Password:</p>
                        <input
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            id="loginPassword"
                            value={this.state.password}
                            required
                        />
                    </div>
                    <input className={"submitBtn"} type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

    render() {
        const widgetStyle = {
            order: this.props.order,
            display: (this.props.showing ? "block" : "none"),
            width: "30vw",
            animation: `appear 1s ease-out ${this.props.order*100}ms forwards`
        };
        return (
            <div className={"widget"} style={widgetStyle}>
                <div className={"closeWidgetBtn"}>
                    <p onClick={this.props.close} className={"innerX"}>X</p>
                </div>
                <h2>Login</h2>
                {this.props.attemptedLogin ? this.attemptedLogin() : this.loginForm()}
                <p className={"red"}>{this.state.failedMessage}</p>
            </div>
        );
    }
}

export default Login;