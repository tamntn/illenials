import React, { Component } from 'react';
import { FirebaseContext } from '../firebase';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faList, faTh, faBars } from '@fortawesome/free-solid-svg-icons';
import { viewOptions } from '../utils/view-options.js';
import SongListFull from '../components/song-list/SongListFull';
import SongListSquare from '../components/song-list/SongListSquare';
import AudioController from '../components/audio-player/AudioController';
import Leaderboard from '../components/song-vote/Leaderboard';
import '../style/views/songs.css';

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    fetchSongs = () => {
        const firebase = this.context;
        const db = firebase.firestore();
        const songsRef = db.collection('songs');

        songsRef.orderBy("release_date", "desc").get().then(querySnapshots => {
            let songs = [];
            querySnapshots.forEach(doc => songs.push({
                id: doc.id,
                data: doc.data()
            }));
            this.setState({
                all_songs: songs,
                all_songs_by_year: this.generateSongsByYearList(songs)
            })
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

    onSearch = (event) => {
        const search_text = event.target.value;
        this.setState({ search_text })
        const search_songs = this.state.all_songs.filter(song => {
            const song_data = song.data;
            if (song_data.name.toLowerCase().includes(search_text)) {
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

    render() {
        const { search_text, view_option, playing_song } = this.state;

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
                                onClick={() => { }}
                            />
                            <FontAwesomeIcon icon={faList}
                                className={`action-icon ${this.state.view_option === viewOptions.full ? "action-icon-selected" : null}`}
                                onClick={() => this.switchView(viewOptions.full)}
                            />
                            <FontAwesomeIcon icon={faTh}
                                className={`action-icon ${this.state.view_option === viewOptions.square ? "action-icon-selected" : null}`}
                                onClick={() => this.switchView(viewOptions.square)}
                            />
                            <FontAwesomeIcon icon={faBars}
                                className={`menu-icon`}
                                onClick={() => { }}
                            />
                        </div>
                        {
                            view_option === viewOptions.full
                            &&
                            <SongListFull
                                songs_by_year={this.state.all_songs_by_year}
                                openLeaderboard={this.openLeaderboard}
                                selectSong={this.selectSong}
                            />
                        }
                        {
                            view_option === viewOptions.square
                            &&
                            <SongListSquare
                                songs_by_year={this.state.all_songs_by_year}
                                openLeaderboard={this.openLeaderboard}
                                selectSong={this.selectSong}
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
        </React.Fragment>
    }
}

AudioPlayer.contextType = FirebaseContext;

export default AudioPlayer;