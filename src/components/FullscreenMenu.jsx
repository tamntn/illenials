import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp} from '@fortawesome/free-solid-svg-icons';
import '../style/fullscreen-menu.css';

const FullscreenMenuWrapper = posed.div({
    visible: {
        opacity: 1,
        transition: { duration: 300, ease: 'easeIn', delay: 350 }
    },
    hidden: {
        opacity: 0,
        transition: { duration: 300 }
    }
})

const FullscreenMenuLeft = posed.div({
    visible: {
        opacity: 1,
        transition: { duration: 500, ease: 'easeIn', delay: 350 }
    },
    hidden: {
        opacity: 0,
        transition: { duration: 500 }
    }
})

const FullscreenMenuRight = posed.ul({
    visible: {
        delayChildren: 500,
        staggerChildren: 200
    },
    hidden: {},
});

const MenuItem = posed.li({
    visible: {
        opacity: 1,
        transition: { duration: 500 }
    },
    hidden: {
        opacity: 0,
        transition: { duration: 500 }
    }
})

class FullscreenMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closing: false
        }
    }

    closeMenu = () => {
        this.setState({ closing: true })
    }

    signOut = () => {
        const firebaseApp = this.context;
        firebaseApp.auth().signOut();
    }

    render() {
        const { isSignedIn, classes } = this.props;

        return (
            <FullscreenMenuWrapper className="fullscreen-menu-wrapper" pose={this.state.closing ? 'hidden' : 'visible'}>
                <FullscreenMenuLeft className="menu-left" initialPose="hidden" pose="visible">
                    <video className="menu-video" playsInline autoPlay muted loop>
                        <source src="https://illenials-audio-player.s3.us-east-2.amazonaws.com/app-videos/recap-min.mp4" type="video/mp4"></source>
                    </video>
                </FullscreenMenuLeft>
                <FullscreenMenuRight className="menu-right" initialPose="hidden" pose="visible">
                    <FontAwesomeIcon icon={faChevronUp} className="action" onClick={() => this.props.goToPage(0)} />
                    <PoseGroup>
                        <MenuItem key={1}><Link to="/home" onClick={() => this.props.goToPage(0)} >Home</Link></MenuItem>
                        <MenuItem key={2}><Link to="/songs">Song Vote</Link></MenuItem>
                        <MenuItem key={3}><Link to="/credits">Credits</Link></MenuItem>
                        {
                            !isSignedIn
                            &&
                            <MenuItem key={4}><Link to="/signin">Sign In</Link></MenuItem>
                        }
                        {
                            isSignedIn
                            &&
                            <MenuItem key={5}><Link to="/profile">User Profile</Link></MenuItem>
                        }
                        {
                            isSignedIn
                            &&
                            <MenuItem key={6} onClick={this.signOut}>Sign Out</MenuItem>
                        }
                    </PoseGroup>
                    <div className="menu-footer">made by 👨🏻‍💻 with ☕️ & 🧡</div>
                </FullscreenMenuRight>
            </FullscreenMenuWrapper>
        )
    }
}

FullscreenMenu.contextType = FirebaseContext;

export default withRouter(FullscreenMenu);