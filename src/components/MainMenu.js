import React, {Component} from 'react';

class MainMenu extends Component {
    options() {
        let visibleOptions = [...this.props.widgets];
        if (this.props.authenticated) {
            visibleOptions = visibleOptions.filter(option => option !== "login" && option !== "register");
        }
        let listItems = visibleOptions.map(widget => {
            const widgetShowing = this.props.visibleWidgets.includes(widget);
            const liStyle = {
                textShadow: widgetShowing ? "0 0 2px gold" : "none",
                cursor: "pointer"
            };
            const toggleWidget = async () => {
                await widgetShowing ?
                    this.props.closeWidget(widget) :
                    this.props.showWidget(widget);
                this.props.bringMenuToFront();
            };
            return (
                <li key={widget} onClick={toggleWidget} style={liStyle}>{widget}</li>
            );
        });
        return(
            <ul className={"mainMenuOptions"}>
                {listItems}
            </ul>
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
                <h2>Main Menu</h2>
                {this.options()}
            </div>
        );
    }
}

export default MainMenu;