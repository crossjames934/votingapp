import React, {Component} from 'react';

class Intro extends Component {
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
                <h2>Welcome to Cross Voting</h2>
                <p>Here you can make your own polls, and have your friends vote on them.</p>
                <p>You can do all this without making an account, but if you want to make lots of polls you will need to register.</p>
                <p>Registering is super easy, you can do it with a couple clicks if you use your Facebook or Google account.</p>
                <p>You can also register using traditional means too.</p>
            </div>
        );
    }
}

export default Intro;