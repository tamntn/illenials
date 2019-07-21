import React, { Component } from 'react';
import FullscreenMenu from './FullscreenMenu';
import '../style/welcome-page.css';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className="welcome-page-wrapper">
            {this.props.showMenu ? <FullscreenMenu close={this.closeFullscreenMenu} goToPage={this.props.goToPage} isSignedIn={this.props.isSignedIn} /> : null}
        </div>
    }
}

export default WelcomePage;