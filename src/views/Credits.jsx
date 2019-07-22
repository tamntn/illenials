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
                    <div>All music is by ILLENIUM and featured artists. Music metadata is obtained from Spotify API and audio files are streamed from SoundCloud.</div>
                    <div>I do not own any rights to the music nor the music data and the audio.</div>
                    <div>This is a hobby project and no data was, has been and will be used for commercial purposes.</div>
                </CreditBox>
                <CreditBox className="credits-box">
                    <div className="credits-box-name">GRAPHICS</div>
                    <div>Album artworks are owned by ILLENIUM and obtained from Spotify API & SoundCloud.</div>
                    <div>The video used in menu page was downloaded from ILLENIUM's Facebook page.</div>
                    <div>GIFs from GIPHY.</div>
                </CreditBox>
                <CreditBox className="credits-box">
                    <div className="credits-box-name">TECH</div>
                    <div>Facebook React, Google Firebase Authentication, Cloud Firestore, Spotify API, Amazon S3, etc.</div>
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