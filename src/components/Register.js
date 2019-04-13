import React, {Component} from 'react';
import axios from 'axios';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            submitted: false,
            errorMessage: ""
        };
        this.successMessage = "Registered successfully, please check email for activation link.";
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        const { username, password, email } = this.state;
        axios.post('/register', {username, password, email})
            .then((response) => {
                //handle success
                if (response.status !== 200) {
                    alert("There was a problem connecting to the server, see console for more information");
                    return console.log(response);
                }
                // problem with information (email already in use etc)
                if (response.data !== this.successMessage) {
                    return this.setState({errorMessage: response.data}, () => {
                        setTimeout(() => {
                            this.setState({errorMessage: ""});
                        }, 5000);
                    });
                }
                // Successful registration
                this.setState({
                    username: "",
                    password: "",
                    email: "",
                    submitted: true,
                    errorMessage: "",
                });
            })
            .catch((response) => {
                //handle error
                alert("There was a problem connecting to the server, see console for more information");
                return console.log(response);
            });
        e.preventDefault();
    }

    registrationForm() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="spaceAround">
                    <p>Username:</p>
                    <input
                        onChange={this.handleChange}
                        name="username"
                        type="text"
                        id="registeringUsername"
                        value={this.state.username}
                        required
                    />
                </div>
                <div className="spaceAround">
                    <p>Password:</p>
                    <input
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        id="registeringPassword"
                        value={this.state.password}
                        required
                    />
                </div>
                <div className="spaceAround">
                    <p>Email:</p>
                    <input
                        onChange={this.handleChange}
                        name="email"
                        type="email"
                        id="registeringEmail"
                        value={this.state.email}
                        required
                    />
                </div>
                <input className={"submitBtn"} type="submit" value="Submit"/>
                <p className={"red"}>{this.state.errorMessage}</p>
            </form>
        );
    }

    showSuccess() {
        return(
            <div>
                <p>{this.successMessage}</p>
                <p className={"red"}>You may need to check the spam folder.</p>
                <p className={"clickableText"} onClick={() => {this.setState({submitted: false})}}>Back</p>
            </div>
        );
    }

    render() {
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>Register</h2>
                    {this.state.submitted ? this.showSuccess() : this.registrationForm()}
                </div>
            </div>
        );
    }
}

export default Register;