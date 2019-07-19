import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Explicit } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import '../../style/song-item/song-item-full.css';

const styles = {
    paper: {
        backgroundColor: 'transparent'
    },
    icon: {
        color: '#757575',
        marginLeft: '8px',
        fontSize: '18px'
    }
};

class SongItemFull extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getAlbumText = (song) => {
        const album = song.album;
        if (album) {
            if (album.type === "single") {
                return <a href={album.spotify_url} target="_blank">Single</a>
            } else {
                return <a href={album.spotify_url} target="_blank">{album.name}</a>
            }
        } else {
            if (song.name.includes("Intro")) {
                return <span>Live</span>
            } else {
                return <span>Single</span>
            }
        }
    }

    render() {
        const { song_data, classes } = this.props;
        const isSpotify = song_data.spotify_uri;
        const isExplicit = song_data.explicit;

        return (
            <Paper className={`song-item-full ${classes.paper}`} square>
                <img src={isSpotify ? song_data.album.artwork_url : song_data.artwork_url} />
                <div className="song-item-full-right">
                    <div className="top">
                        <div className="title">{song_data.name}{isExplicit ? <Explicit className={classes.icon} /> : null}</div>
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
                        <div className="album">
                            {
                                this.getAlbumText(song_data)
                            }
                        </div>
                    </div>
                    <div className="bottom">
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

export default withStyles(styles)(SongItemFull);