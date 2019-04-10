import React, {Component} from 'react';
import axios from 'axios';

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
        const widgetStyle = {
            order: this.props.order,
            display: (this.props.showing ? "block" : "none"),
            width: "30vw",
            animation: `appear 1s ease-out ${this.props.order*100}ms forwards`
        };
        const spaceAround = {
            display: "flex",
            justifyContent: "space-between",
            margin: '10px 0'
        };
        return (
            <div className={"widget"} style={widgetStyle}>
                <div className={"closeWidgetBtn"}>
                    <p onClick={this.props.close} className={"innerX"}>X</p>
                </div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div style={spaceAround}>
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
                    <div style={spaceAround}>
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
                    <div style={spaceAround}>
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
        );
    }
}

export default Register;