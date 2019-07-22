import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseContext } from '../firebase';
import { Grid, TextField, InputAdornment, Snackbar, SnackbarContent, Slide } from '@material-ui/core';
import { SearchOutlined, Close as CloseIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faList, faTh, faHome } from '@fortawesome/free-solid-svg-icons';
import { viewOptions } from '../utils/view-options.js';
import phoenixGif from '../images/phoenix.gif';
import SongListFull from '../components/song-list/SongListFull';
import SongListSquare from '../components/song-list/SongListSquare';
import AudioController from '../components/audio-player/AudioController';
import Leaderboard from '../components/song-vote/Leaderboard';
import '../style/views/songs.css';

const AppMessage = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        border: '1px solid #f6e3b2',
        maxWidth: '550px'
    },
    message: {
        color: 'white',
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '17px',
        fontWeight: '500'
    }
})(SnackbarContent);

const CloseMessageIcon = withStyles({
    root: {
        color: '#f6e3b2'
    }
})(CloseIcon)

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMessage: true,
            search_text: "",
            all_songs: "",
            all_songs_by_year: [],
            playing_song: undefined,
            view_option: viewOptions.full,
            openLeaderboard: false
        }
    }

    componentDidMount() {
        this.fetchSongs();
    }

    componentWillUnmount() {
        this.stopRealtimeListener();
    }

    fetchSongs = () => {
        const firebaseApp = this.context;
        const db = firebaseApp.firestore();
        const songsRef = db.collection('songs');

        this.stopRealtimeListener = songsRef.orderBy("release_date", "desc").onSnapshot(querySnapshots => {
            let songs = [];
            querySnapshots.forEach(doc => songs.push({
                id: doc.id,
                data: doc.data()
            }));
            setTimeout(() => {
                this.setState({
                    all_songs: songs,
                    all_songs_by_year: this.generateSongsByYearList(songs)
                })
            }, 750)
        })
    }

    generateSongsByYearList = (songs) => {
        let songs_by_year = [];
        songs.forEach(song => {
            const release_year = song.data.release_date.split("-")[0];
            let yearInArray = false;
            songs_by_year.forEach(songs_by_year_object => {
                if (release_year === songs_by_year_object.year) {
                    yearInArray = true;
                    songs_by_year_object.songs.push(song);
                }
            })
            if (!yearInArray) {
                songs_by_year.push({
                    year: release_year,
                    songs: [song]
                })
            }
        })
        return songs_by_year;
    }

    handleOpenMessage = () => {
        this.setState({ viewMessage: true })
    }

    handleCloseMessage = () => {
        this.setState({ viewMessage: false })
    }

    getUserDisplayIdentity = () => {
        const firebaseApp = this.context;
        const { currentUser } = firebaseApp.auth()
        const name = currentUser.displayName;
        const email = currentUser.email;
        const phone = currentUser.phoneNumber;

        if (name) return name;
        else if (email) return email;
        else return phone;
    }

    onSearch = (event) => {
        const search_text = event.target.value;
        this.setState({ search_text })
        const search_songs = this.state.all_songs.filter(song => {
            const song_data = song.data;
            if (song_data.name.toLowerCase().includes(search_text.toLowerCase())) {
                return true
            } else {
                return false
            }
        })
        this.setState({ all_songs_by_year: this.generateSongsByYearList(search_songs) })
    }

    switchView = (view_option) => {
        this.setState({ view_option });
    }

    openLeaderboard = () => {
        this.setState({ openLeaderboard: true })
    }

    closeLeaderboard = () => {
        this.setState({ openLeaderboard: false })
    }

    selectSong = (song) => {
        this.setState({ playing_song: song });
    }

    likeSong = (songId) => {
        const firebaseApp = this.context;
        const db = firebaseApp.firestore();
        const { currentUser } = firebaseApp.auth();
        if (currentUser) {
            const { uid } = currentUser;
            let songsRef = db.collection('songs');
            let songRef = songsRef.doc(songId).update({
                "likes": firebase.firestore.FieldValue.arrayUnion(uid)
            })
        }
    }

    unlikeSong = (songId) => {
        const firebaseApp = this.context;
        const db = firebaseApp.firestore();
        const { currentUser } = firebaseApp.auth();
        if (currentUser) {
            const { uid } = currentUser;
            let songsRef = db.collection('songs');
            let songRef = songsRef.doc(songId).update({
                "likes": firebase.firestore.FieldValue.arrayRemove(uid)
            })
        }
    }

    render() {
        const { viewMessage, search_text, view_option, playing_song } = this.state;
        const { isSignedIn } = this.props;

        if (isSignedIn === undefined) return null;

        if (isSignedIn === false) {
            this.props.openMessage("You must sign in before entering to vote.")
            return <Redirect to="/signin" />
        }

        if (this.state.all_songs_by_year.length === 0) {
            return <div className="songs-loader">
                <img src={phoenixGif} />
                <div>ascending...</div>
            </div>
        }

        return <React.Fragment>
            <Grid container spacing={0}>
                <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={2} xl={3}></Grid>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={6}>
                    <div className="songs-wrapper">
                        <div className="songs-action-bar">
                            <TextField
                                id="outlined-name"
                                placeholder="Search"
                                value={search_text}
                                onChange={this.onSearch}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment>,
                                }}
                            />
                            <FontAwesomeIcon icon={faQuestionCircle}
                                className={`question-icon`}
                                onClick={this.handleOpenMessage}
                            />
                            <FontAwesomeIcon icon={faList}
                                className={`action-icon ${this.state.view_option === viewOptions.full ? "action-icon-selected" : null}`}
                                onClick={() => this.switchView(viewOptions.full)}
                            />
                            <FontAwesomeIcon icon={faTh}
                                className={`action-icon ${this.state.view_option === viewOptions.square ? "action-icon-selected" : null}`}
                                onClick={() => this.switchView(viewOptions.square)}
                            />
                            <FontAwesomeIcon icon={faHome}
                                className={`menu-icon`}
                                onClick={() => { this.props.history.push('/home') }}
                            />
                        </div>
                        {
                            view_option === viewOptions.full
                            &&
                            <SongListFull
                                songs_by_year={this.state.all_songs_by_year}
                                openLeaderboard={this.openLeaderboard}
                                selectSong={this.selectSong}
                                likeSong={this.likeSong}
                                unlikeSong={this.unlikeSong}
                            />
                        }
                        {
                            view_option === viewOptions.square
                            &&
                            <SongListSquare
                                songs_by_year={this.state.all_songs_by_year}
                                openLeaderboard={this.openLeaderboard}
                                selectSong={this.selectSong}
                                likeSong={this.likeSong}
                                unlikeSong={this.unlikeSong}
                            />
                        }
                    </div>
                </Grid>
                <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={2} xl={3}></Grid>
            </Grid>
            {
                playing_song
                &&
                <AudioController song_data={playing_song} />
            }
            <Leaderboard
                open={this.state.openLeaderboard}
                closeLeaderboard={this.closeLeaderboard} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={viewMessage}
                autoHideDuration={10000}
                onClose={this.handleCloseMessage}
            >
                <AppMessage
                    message={`Hi ${this.getUserDisplayIdentity()}!\nLike songs to vote. View rankings with Leaderboard. The top 16 songs will be picked into the first head-to-head round 🎉`}
                    action={[<CloseMessageIcon onClick={this.handleCloseMessage} />]}
                />
            </Snackbar>
        </React.Fragment>
    }
}

AudioPlayer.contextType = FirebaseContext;

export default AudioPlayer;