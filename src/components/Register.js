import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        axios.post('/register', {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                console.log(res);
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
                <div onClick={this.props.close} className={"closeWidgetBtn"}>
                    <p className={"innerX"}>X</p>
                </div>
                <h2>Register</h2>
                <form action="/register" method="POST" onSubmit={this.handleSubmit}>
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
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default Register;