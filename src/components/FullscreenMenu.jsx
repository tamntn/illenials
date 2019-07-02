import React, { Component } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import recapVideo from '../images/recap-min.mp4';
import '../style/fullscreen-menu.css'

class FullscreenMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    closeMenu = () => {
        this.props.close();
    }

    render() {
        return (
            <div className="fullscreen-menu-wrapper">
                <div className="menu-left">
                    <video className="menu-video" playsInline autoPlay muted loop>
                        <source src={recapVideo} type="video/mp4"></source>
                    </video>
                    {/* <iframe src="http://tv.giphy.com/?username=illeniummusic" frameBorder="0" allowFullScreen></iframe> */}
                </div>
                <div className="menu-right">
                    <div>Home</div>
                    <div>Bracket</div>
                    <div>About</div>
                    <div onClick={this.closeMenu}>Close</div>
                </div>
            </div>
        )
    }
}

export default FullscreenMenu;