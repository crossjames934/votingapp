import React, {Component} from 'react';

import CloseWidgetBtn from './CloseWidgetBtn';
import widgetStyle from './widgetStyle';

class MainMenu extends Component {
    options() {
        let visibleOptions = [...this.props.widgets];
        if (this.props.authenticated) {
            visibleOptions = visibleOptions.filter(option => option !== "Login" && option !== "Register");
        } else {
            visibleOptions = visibleOptions.filter(option => option !== "My Polls");
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
        return (
            <div id={this.props.id} className={"widget"} style={widgetStyle(this.props.order, this.props.showing)}>
                <div className="scrollable">
                    <CloseWidgetBtn close={this.props.close}/>
                    <h2>Main Menu</h2>
                    {this.options()}
                </div>
            </div>
        );
    }
}

export default MainMenu;