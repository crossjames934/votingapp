import React, {Component} from 'react';

class Intro extends Component {
    constructor(props) {
        super(props);

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
                    <div style={{width: 20}}>
                        <p className={"innerX"}>X</p>
                    </div>
                </div>
                <h2>Welcome to Cross Voting</h2>
                <p>Here you can make your own polls, and have your very own link that you can send to all your friends.</p>
                <p>You need to register if you want to create your own polls, but you can vote on other polls without an account.</p>
                <p>Registering is super easy, you can do it with a couple clicks if you use your Facebook or Google account.</p>
                <p>You can also register using traditional means too.</p>
            </div>
        );
    }
}

export default Intro;