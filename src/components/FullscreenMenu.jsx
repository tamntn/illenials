import React, { Component } from 'react';
import posed from 'react-pose';
import recapVideo from '../images/recap-min.mp4';
import '../style/fullscreen-menu.css'

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
        transition: { duration: 500}
    },
    hidden: {
        opacity: 0,
        transition: { duration: 500}
    }
})

class FullscreenMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    closeMenu = () => {
        this.props.close();
    }

    render() {
        return (
            <div className="fullscreen-menu-wrapper">
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
                    <MenuItemOne onClick={this.closeMenu}>Close</MenuItemOne>
                </FullscreenMenuRight>
            </div>
        )
    }
}

export default FullscreenMenu;