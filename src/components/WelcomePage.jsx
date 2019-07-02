import React, { Component } from 'react';
import FullscreenMenu from './FullscreenMenu';
import '../style/welcome-page.css';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false
        }
    }

    onOpenFullscreenMenu = () => {
        this.setState({ menuVisible: true });
        this.props.disableScrolling(true);
    }

    closeFullscreenMenu = () => {
        this.setState({ menuVisible: false });
        this.props.disableScrolling(false);
    }

    componentDidMount() {

    }

    render() {
        return <div>
            <div className="welcome-page-wrapper">
                <button
                    className="open-menu-button"
                    onClick={this.onOpenFullscreenMenu}
                >Menu</button>
            </div>
            {this.state.menuVisible ? <FullscreenMenu close={this.closeFullscreenMenu} /> : null}
        </div>
    }
}

export default WelcomePage;