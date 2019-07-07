import React, { Component } from 'react';
import { Button } from '@material-ui/core';
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
        return <div className="welcome-page-wrapper">
            <h2>Welcome fellow illenials,</h2>
            <Button
                variant="outlined"
                size="large"
                color="primary"
                className="open-menu-button"
                onClick={this.onOpenFullscreenMenu}
            >Menu</Button>
            {this.state.menuVisible ? <FullscreenMenu close={this.closeFullscreenMenu} /> : null}
        </div>
    }
}

export default WelcomePage;