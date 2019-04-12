import React, {Component} from 'react';
import axios from 'axios';

class AuthenticationSegment extends Component {
    logout = () => {
        axios.get('/logout')
            .then(res => {
                console.log(res.data);
                // this.props.updateAuthenticationStatus(false, "");
                this.props.updateParentState({
                    authenticated: false,
                    username: "",
                    attemptedLogin: false
                });
            })
            .catch(e => {
                alert("There was an error connecting, please check console for the error");
                console.log(e);
            });
    };

    notAuthenticated() {
        return(
            <div className="authenticationLinks">
                <p className="clickableText" onClick={this.props.showRegister}>Register</p>
                <p> || </p>
                <p className="clickableText" onClick={this.props.showLogin}>Log In</p>
            </div>
        );
    }

    authenticated() {
        return(
            <div>
                <p>Welcome {this.props.username}</p>
                <p className="clickableText" onClick={this.logout}>Sign Out</p>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.props.authenticated ? this.authenticated() : this.notAuthenticated()}
            </div>
        );
    }
}

export default AuthenticationSegment;