import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import '../../style/song-item/song-item-square.css';

const styles = {
    paper: {
        backgroundColor: 'transparent'
    }
};

class SongItemSquare extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { song_data, classes } = this.props;
        const isSpotify = song_data.spotify_uri;

        return (
            <Paper className={`song-item-square ${classes.paper}`} onClick={() => this.props.selectSong(song_data)}>
                <img src={isSpotify ? song_data.album.artwork_url : song_data.artwork_url} />
                <div>
                    <div className="info">
                        <div className="title">{song_data.name}</div>
                        <div className="artist">
                            {
                                song_data.artists.map((artist, i) => {
                                    return <React.Fragment key={i}>
                                        <a href={artist.spotify_url} target="_blank">{artist.name}</a>
                                        {song_data.artists.length === i + 1 ? null : <span>,&nbsp;</span>}
                                    </React.Fragment>
                                })
                            }
                        </div>
                    </div>
                    <div className="actions">
                        <div>
                            {
                                isSpotify ? <a href={song_data.spotify_url} target="_blank">
                                    <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
                                </a> : null
                            }
                            <a href={song_data.soundcloud_url} target="_blank">
                                <FontAwesomeIcon icon={faSoundcloud} className="soundcloud-icon" />
                            </a>
                        </div>
                        <div>
                            {/* <span>30</span> */}
                            <FontAwesomeIcon icon={faHeart} className="heart" />
                            {/* <FontAwesomeIcon icon={faHeartSolid} className="heart-solid" /> */}
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(SongItemSquare);