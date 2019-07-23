import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Sticky from 'react-stickynode';
import './../style/leaderboard.css';

const LeaderboardDrawer = withStyles({
    root: {
        backgroundColor: 'transparent',
    },
    paperAnchorTop: {
        background: 'rgba(0, 0, 0, 0.9)',
        borderBottom: '16px'
    }
})(Drawer);

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    sortSongsByLikes = (songs) => {
        return songs.sort((a, b) => {
            const a_likes = a.data.likes.length;
            const b_likes = b.data.likes.length;
            return b_likes - a_likes;
        })
    }

    onClose = () => {
        this.props.closeLeaderboard();
    }

    getAlbumText = (song) => {
        const album = song.album;
        if (album) {
            if (album.type === "single") {
                return "Single"
            } else {
                return album.name
            }
        } else {
            if (song.name.includes("Intro")) {
                return "Live"
            } else {
                return "Single"
            }
        }
    }

    render() {
        return <LeaderboardDrawer
            anchor="top"
            open={this.props.open}
            onClose={() => this.onClose()}
        >
            <div className="leaderboard">
                <div className="title">LEADERBOARD</div>
                <Grid container spacing={0}>
                    <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={3} xl={3}></Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div className="table">
                            <div className="header">
                                <div className="rank">#</div>
                                <div className="name">TRACK</div>
                                <div className="likes">LIKES</div>
                            </div>
                            {
                                this.sortSongsByLikes(this.props.songs).map((song, i) => {
                                    return <div className={`row ${i < 16 ? 'top' : ''}`} key={i}>
                                        <div className="rank">{i + 1}</div>
                                        <div className="name">{song.data.name}<span>&nbsp;&bull;&nbsp;{this.getAlbumText(song.data)}</span></div>
                                        <div className="likes">{song.data.likes.length}</div>
                                    </div>
                                })
                            }
                        </div>
                    </Grid>
                    <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={3} xl={3}></Grid>
                </Grid>
                <FontAwesomeIcon icon={faAngleUp} className="collapse-button"
                    onClick={() => this.onClose()}
                />
            </div >
        </LeaderboardDrawer >
    }
}

export default Leaderboard;