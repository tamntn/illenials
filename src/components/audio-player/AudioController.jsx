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
            completed: 35,
            openViewer: false,
            isPlaying: true
        }
    }

    openViewer = () => {
        this.setState({ openViewer: true });
    }

    closeViewer = () => {
        this.setState({ openViewer: false });
    }

    displayArtists = (artists) => {
        return artists.map(artist => artist.name).join(", ");
    }

    play = (event) => {
        event.stopPropagation();
        this.setState({ isPlaying: true });
    }

    pause = (event) => {
        event.stopPropagation();
        this.setState({ isPlaying: false });
    }

    like = (event) => {
        event.stopPropagation();
    }

    unlike = (event) => {
        event.stopPropagation();
    }

    render() {
        const { song_data } = this.props;
        const { completed, openViewer, isPlaying } = this.state;

        return <div className="audio-controller-wrapper">
            <div className="mobile" onClick={() => this.openViewer()}>
                <AudioProgress variant="determinate" value={completed} />
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
                play={this.play}
                pause={this.pause} />
        </div>
    }
}

export default AudioController;