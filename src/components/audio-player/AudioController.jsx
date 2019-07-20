import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faPause, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import AudioViewer from './AudioViewer';
import '../../style/audio-player/audio-controller.css';

const AudioProgress = withStyles({
    root: {
        height: 3,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
    },
    bar: {
        backgroundColor: '#e65100',
    },
})(LinearProgress);

class AudioController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openViewer: false,
            isPlaying: true,
            audioLength: undefined,
            audioCurrentTime: undefined
        }

        this.audio = React.createRef();
    }

    componentDidMount() {
        this.play();
    }

    componentDidUpdate(prevProps) {
        const newSongData = prevProps.song_data !== this.props.song_data;
        if (newSongData) this.switchSong();
    }

    openViewer = () => {
        this.setState({ openViewer: true });
    }

    closeViewer = () => {
        this.setState({ openViewer: false });
    }

    normaliseProgress = () => {
        if (isNaN(this.state.audioLength)) {
            return 0.1
        } else {
            return this.state.audioCurrentTime * 100 / this.state.audioLength;
        }
    }

    displayArtists = (artists) => {
        return artists.map(artist => artist.name).join(", ");
    }

    switchSong = () => {
        this.audio.current.src = this.props.song_data.audio_url;
        this.play();
    }

    play = (event) => {
        if (event) event.stopPropagation();

        this.setState({ isPlaying: true });
        this.audio.current.play();
        this.audio.current.addEventListener('timeupdate', (timeUpdateEvent) => {
            this.setState({
                audioLength: timeUpdateEvent.target.duration,
                audioCurrentTime: timeUpdateEvent.target.currentTime
            })
            this.normaliseProgress();
        });
    }

    pause = (event) => {
        event.stopPropagation();
        this.setState({ isPlaying: false });
        this.audio.current.pause();
    }

    updateCurrentTime = (value) => {
        const duration = this.state.audioLength;

        if (value < duration) {
            this.setState({ audioCurrentTime: value })
            this.audio.current.currentTime = value;
        } else {
            this.setState({ audioCurrentTime: duration })
            this.audio.current.currentTime = duration;
        }
    }

    like = (event) => {
        event.stopPropagation();
    }

    unlike = (event) => {
        event.stopPropagation();
    }

    render() {
        const { song_data } = this.props;
        const { openViewer, isPlaying } = this.state;

        return <div className="audio-controller-wrapper">
            <div className="mobile" onClick={() => this.openViewer()}>
                <AudioProgress
                    variant="determinate"
                    value={this.normaliseProgress()}
                />
                <div className="actions">
                    {
                        isPlaying
                            ?
                            <FontAwesomeIcon
                                onClick={this.pause}
                                icon={faPause} className="play-button" />
                            :
                            <FontAwesomeIcon
                                onClick={this.play}
                                icon={faPlay} className="play-button" />
                    }
                    <div className="song-info">
                        <div className="title">{song_data.name}</div>
                        <div className="artists">{this.displayArtists(song_data.artists)}</div>
                    </div>
                    <FontAwesomeIcon
                        onClick={this.like}
                        icon={faHeart} className="heart-button" />
                </div>
            </div>
            <AudioViewer
                open={openViewer}
                openViewer={this.openViewer}
                closeViewer={this.closeViewer}
                song_data={song_data}
                isPlaying={isPlaying}
                current={isNaN(this.state.audioCurrentTime) ? 0 : Math.round(this.state.audioCurrentTime)}
                duration={isNaN(this.state.audioLength) ? 100 : Math.round(this.state.audioLength)}
                updateCurrentTime={this.updateCurrentTime}
                play={this.play}
                pause={this.pause} />
            <audio
                src={song_data.audio_url} ref={this.audio}
            ></audio>
        </div>
    }
}

export default AudioController;