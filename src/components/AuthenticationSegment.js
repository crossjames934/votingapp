import React, {Component} from 'react';

class AuthenticationSegment extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         showRegister: false,
    //         showLogin: false
    //     };
    // }

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
                <p className="clickableText">Sign Out</p>
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