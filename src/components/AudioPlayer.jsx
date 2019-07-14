import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio: undefined
        }
        this.audio = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    select = (audioUrl) => {
        this.audio.current.src = audioUrl;
        this.audio.current.play();
        console.log(this.audio);
    }

    play = () => {
        this.state.audio.play();
    }

    render() {
        return <div>
            {/* <div>
                    <audio controls type="audio/mpeg">
                        <source
                            src="https://www.dropbox.com/s/xu6n9zomqmix3rk/Niykee%20Heaton%20-%20Infinity%20%28Illenium%20Remix%29.mp3?dl=1"
                        ></source>
                    </audio>
                </div> */}
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                    this.select("https://illenials-audio-player.s3.us-east-2.amazonaws.com/Kompany+-+Rapture.mp3");
                    // this.play();
                }}
            >Play 1</Button>
            <audio ref={this.audio}></audio>
        </div>
    }
}

export default AudioPlayer;