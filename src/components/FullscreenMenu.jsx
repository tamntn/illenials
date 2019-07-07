import React, { Component } from 'react';
import posed from 'react-pose';
import { withStyles } from '@material-ui/styles';
import { CloseRounded } from '@material-ui/icons';
import recapVideo from '../images/recap-min.mp4';
import '../style/fullscreen-menu.css';

const styles = {
    closeIcon: {
        fontSize: 38,
        position: 'absolute',
        top: '24px',
        right: '24px',
        '&:hover': {
            // filter: 'opacity(50%)',
            cursor: 'pointer',
        },
    }
};

const FullscreenMenuWrapper = posed.div({
    visible: {
        opacity: 1,
        // scale: 1,
        transition: { duration: 300, ease: 'easeIn' }
    },
    hidden: {
        opacity: 0,
        // scale: 0.1,
        transition: { duration: 300 }
    }
})

const FullscreenMenuLeft = posed.div({
    visible: {
        opacity: 1,
        transition: { duration: 500, ease: 'easeIn' }
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

const MenuItemOne = posed.li({
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
        setTimeout(() => {
            this.props.close();
        }, 300);
    }

    render() {
        const { classes } = this.props;

        return (
            <FullscreenMenuWrapper className="fullscreen-menu-wrapper" pose={this.state.closing ? 'hidden' : 'visible'}>
                <FullscreenMenuLeft className="menu-left" initialPose="hidden" pose="visible">
                    <video className="menu-video" playsInline autoPlay muted loop>
                        <source src={recapVideo} type="video/mp4"></source>
                    </video>
                    {/* <iframe src="http://tv.giphy.com/?username=illeniummusic" frameBorder="0" allowFullScreen></iframe> */}
                </FullscreenMenuLeft>
                <FullscreenMenuRight className="menu-right" initialPose="hidden" pose="visible">
                    <MenuItemOne>Home</MenuItemOne>
                    <MenuItemOne>Bracket</MenuItemOne>
                    <MenuItemOne>About</MenuItemOne>
                </FullscreenMenuRight>
                <CloseRounded
                    color="primary"
                    className={classes.closeIcon}
                    onClick={this.closeMenu} />
            </FullscreenMenuWrapper>
        )
    }
}

export default withStyles(styles)(FullscreenMenu);