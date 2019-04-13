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
            email: ""
        };
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
                console.log(response.data);
            })
            .catch((response) => {
                //handle error
                alert("There was a problem connecting to the server, see console for more information");
                return console.log(response);
            });
        e.preventDefault();
    }

    render() {
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>Register</h2>
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
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;