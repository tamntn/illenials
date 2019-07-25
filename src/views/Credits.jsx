import React, { Component } from 'react';
import posed from 'react-pose';
import '../style/views/credits.css';

const CreditBoxWrapper = posed.ul({
    visible: {
        delayChildren: 0,
        staggerChildren: 200
    },
    hidden: {}
})

const CreditBox = posed.li({
    visible: {
        opacity: 1,
        transition: { duration: 700 }
    },
    hidden: {
        opacity: 0,
        transition: { duration: 700 }
    }
})

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <div className="credits">
            <div className="title">CREDITS</div>
            <CreditBoxWrapper className="credits-box-wrapper" initialPose="hidden" pose="visible">
                <CreditBox className="credits-box">
                    <div className="credits-box-name">MUSIC</div>
                    <div>All music is by <a href="https://illenium.com" target="_blank" rel="noopener noreferrer">ILLENIUM</a> and featured artists. All song, artist & album info was obtained from <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">Spotify API</a> and audio files are streamed from <a href="https://developers.soundcloud.com" target="_blank" rel="noopener noreferrer">SoundCloud</a>.</div>
                    <div>I do not own any rights to the music nor any data.</div>
                    <div>This is a hobby project and no data was, has been and will be used for commercial purposes.</div>
                </CreditBox>
                <CreditBox className="credits-box">
                    <div className="credits-box-name">GRAPHICS</div>
                    <div>Album artworks are owned by <a href="https://illenium.com" target="_blank" rel="noopener noreferrer">ILLENIUM</a> and obtained from <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">Spotify API</a> & <a href="https://developers.soundcloud.com" target="_blank" rel="noopener noreferrer">SoundCloud</a>.</div>
                    <div>The video used in menu page was downloaded from ILLENIUM's <a href="https://www.facebook.com/ILLENIUM/videos/381954169089511/" target="_blank" rel="noopener noreferrer">Facebook page</a>.</div>
                    <div>GIFs from <a href="https://giphy.com/illeniummusic" target="_blank" rel="noopener noreferrer">GIPHY</a>.</div>
                </CreditBox>
                <CreditBox className="credits-box">
                    <div className="credits-box-name">TECH</div>
                    <div><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Facebook React</a>, <a href="https://firebase.google.com/docs/auth" target="_blank" rel="noopener noreferrer">Google Firebase Authentication</a>, <a href="https://firebase.google.com/docs/firestore" target="_blank" rel="noopener noreferrer">Cloud Firestore</a>, <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">Spotify API</a>, <a href="https://aws.amazon.com/s3/" target="_blank" rel="noopener noreferrer">Amazon S3</a>, etc.</div>
                </CreditBox>
                <CreditBox className="credits-box">
                    <div className="credits-box-name">DESIGNER</div>
                    <div>The countdown page was designed by <a href="https://www.facebook.com/Saywhu" target="_blank" rel="noopener noreferrer">Bach Nguyen</a></div>
                </CreditBox>
                <CreditBox className="credits-box">
                    <div className="credits-box-name">DEVELOPER</div>
                    <div>TAM</div>
                </CreditBox>
            </CreditBoxWrapper>
        </div>
    }
}

export default Credits;