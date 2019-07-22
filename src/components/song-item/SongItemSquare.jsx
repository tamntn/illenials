import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FirebaseContext } from '../../firebase';
import '../../style/song-item/song-item-square.css';

const styles = {
    paper: {
        backgroundColor: 'transparent'
    }
};

class SongItemSquare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: undefined
        }
    }

    componentDidMount() {
        const firebaseApp = this.context;
        const uid = firebaseApp.auth().currentUser.uid;
        const liked = this.props.song_data.likes.includes(uid);
        this.setState({ liked })
    }

    like = () => {
        this.setState({ liked: true });
        this.props.likeSong(this.props.song_id);
    }

    unlike = () => {
        this.setState({ liked: false });
        this.props.unlikeSong(this.props.song_id);
    }

    render() {
        const { song_id, song_data, classes } = this.props;
        const isSpotify = song_data.spotify_uri;
        const firebaseApp = this.context;
        const uid = firebaseApp.auth().currentUser.uid;
        const liked = song_data.likes.includes(uid);

        return (
            <Paper className={`song-item-square ${classes.paper}`}>
                <img
                    src={isSpotify ? song_data.album.artwork_url : song_data.artwork_url}
                    onClick={() => this.props.selectSong(song_id, song_data)}
                />
                <div>
                    <div className="info">
                        <div className="title"
                            onClick={() => this.props.selectSong(song_id, song_data)}
                        >{song_data.name}</div>
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
                        <div className="likes">
                            <span>{song_data.likes.length}</span>
                            {
                                this.state.liked
                                    ?
                                    <FontAwesomeIcon icon={faHeartSolid} className="heart-solid" onClick={this.unlike} />
                                    :
                                    <FontAwesomeIcon icon={faHeart} className="heart" onClick={this.like} />
                            }
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }
}

SongItemSquare.contextType = FirebaseContext;

export default withStyles(styles)(SongItemSquare);