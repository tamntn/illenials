import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, Drawer } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlay, faPause, faBackward, faForward, faRandom, faHeart as faHeartSolid, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faWindowMinimize } from '@fortawesome/free-regular-svg-icons';
import * as Vibrant from 'node-vibrant';
import animateScrollTo from 'animated-scroll-to';
import '../../style/audio-player/audio-viewer.css';

const drawerStyles = {
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        overflowY: 'auto'
    },
    paperAnchorBottom: {
        background: '#050102',
        borderTop: '16px',
        overflowY: 'auto'
    }
}

const AudioViewerSwipableDrawer = withStyles(drawerStyles)(SwipeableDrawer);
const AudioViewerDrawer = withStyles(drawerStyles)(Drawer);

const AudioSlider = withStyles({
    root: {
        width: 'calc(100vw - 80px)',
        padding: '12px 0px 0px 0px',
        color: 'white'
    }
})(Slider)

class AudioViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 10,
            minimizeImage: false,
            dominantColor: [255, 255, 255],
            dominantColorBright: [255, 255, 255],
            showLyrics: false,
            isSwipable: true
        }

        this.wrapper = React.createRef();
        this.swipableWrapper = React.createRef();
        this.lyrics = React.createRef();
    }

    componentDidMount() {
        this.fetchDominantColor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!(prevProps.song_data === this.props.song_data)) {
            this.fetchDominantColor();
        }
    }

    fetchDominantColor = () => {
        const { song_data } = this.props;

        if (song_data) {
            const isSpotify = song_data.spotify_uri;
            const artworkUrl = isSpotify ? song_data.album.artwork_url : song_data.artwork_url;

            Vibrant.from(artworkUrl).getPalette()
                .then((palette) => this.setState({
                    dominantColor: palette.Vibrant.rgb,
                    dominantColorBright: palette.LightVibrant.rgb
                }))
        }
    }

    displayArtists = (artists) => {
        return artists.map(artist => artist.name).join(", ");
    }

    onClose = () => {
        this.props.closeViewer();
    }

    onSliderChange = (event, value) => {
        this.setState({ sliderValue: value, minimizeImage: true });
    }

    onSliderChangeCommitted = () => {
        this.setState({ minimizeImage: false })
    }

    scrollToLyrics = () => {
        this.setState({ isSwipable: false });

        setTimeout(() => {
            animateScrollTo(this.lyrics.current, { element: this.wrapper.current })
            this.wrapper.current.addEventListener('scroll', () => {
                if (this.wrapper.current.scrollTop === 0) {
                    this.setState({ isSwipable: true })
                }
            })
        }, 100);
    }

    setSwipeable = () => {
        this.setState({ isSwipable: true })
    }

    renderDrawer = () => {
        const { sliderValue, minimizeImage, dominantColor, dominantColorBright, isSwipable } = this.state;
        const { song_data, isPlaying, play, pause } = this.props;
        const isSpotify = song_data.spotify_uri;
        const artworkUrl = isSpotify ? song_data.album.artwork_url : song_data.artwork_url;
        const minimizeArtwork = (minimizeImage || !isPlaying);

        return <div className="audio-viewer" ref={isSwipable ? this.swipableWrapper : this.wrapper}>
            <div className="collapse" onClick={() => this.onClose()}>
                <FontAwesomeIcon icon={faWindowMinimize} className="collapse-button" />
            </div>
            <div className="main">
                <div className="artwork">
                    <img
                        className={minimizeArtwork ? "min" : "full"}
                        style={minimizeArtwork ? null : { boxShadow: `0px 16px 72px 4px rgba(${dominantColorBright[0]}, ${dominantColorBright[1]}, ${dominantColorBright[2]}, 0.35)` }}
                        src={artworkUrl} />
                </div>
                <div className="slider">
                    <AudioSlider value={sliderValue}
                        onChange={this.onSliderChange}
                        onChangeCommitted={this.onSliderChangeCommitted}
                        aria-labelledby="continuous-slider" />
                </div>
                <div className="time">
                    <div>{sliderValue}</div>
                    <div>-2:48</div>
                </div>
                <div className="name">
                    {song_data.name}
                </div>
                <div className="artists" style={{ color: `rgba(${dominantColorBright[0]}, ${dominantColorBright[1]}, ${dominantColorBright[2]}, 0.99)` }}>
                    {this.displayArtists(song_data.artists)}
                </div>
                <div className="actions">
                    <FontAwesomeIcon icon={faRandom} className="shuffle-button" />
                    <FontAwesomeIcon icon={faBackward} className="backward-button" />
                    {
                        isPlaying
                            ?
                            <FontAwesomeIcon icon={faPause} className="play-button" onClick={pause} />
                            :
                            <FontAwesomeIcon icon={faPlay} className="play-button" onClick={play} />
                    }
                    <FontAwesomeIcon icon={faForward} className="forward-button" />
                    <FontAwesomeIcon icon={faHeart} className="like-button" />
                </div>
                <div
                    className="lyrics"
                    ref={this.lyrics}
                    style={{ height: `${window.innerHeight}px` }}
                    onClick={this.scrollToLyrics}
                >
                    <FontAwesomeIcon icon={faArrowDown} className="lyrics-icon" /> Show Lyrics
                </div>
            </div>
        </div>
    }

    render() {
        const { isSwipable } = this.state;

        return (
            isSwipable
                ?
                <AudioViewerSwipableDrawer
                    anchor="bottom"
                    open={this.props.open}
                    onClose={() => this.onClose()}
                    onOpen={event => console.log(event)}
                >
                    {this.renderDrawer()}
                </AudioViewerSwipableDrawer>
                :
                <AudioViewerDrawer
                    anchor="bottom"
                    open={this.props.open}
                    onClose={() => this.onClose()}
                >
                    {this.renderDrawer()}
                </AudioViewerDrawer>
        )
    }
}

export default AudioViewer;