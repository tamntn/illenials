import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import StickyYearDivider from './StickyYearDivider';
import SongItemSquare from '../song-item/SongItemSquare';
import { viewOptions } from '../../utils/view-options.js';

class SongListSquare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: (window.innerWidth < 600) ? true : false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.checkIsMobile);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkIsMobile);
    }

    checkIsMobile = () => {
        this.setState({
            isMobile: (window.innerWidth < 600) ? true : false
        })
    }

    render() {
        const { songs_by_year } = this.props;

        return <React.Fragment>
            {
                songs_by_year.map(songs_by_year_object => {
                    const year = songs_by_year_object.year;
                    const songs = songs_by_year_object.songs;

                    return <React.Fragment key={year}>
                        <StickyYearDivider year={year} number_of_releases={songs.length} openLeaderboard={this.props.openLeaderboard} />
                        <div style={{ height: 24 }}></div>
                        <Grid container spacing={this.state.isMobile ? 2 : 4}>
                            {
                                songs.map(song => {
                                    return <Grid item key={song.id} xs={6} sm={4} md={3} lg={3} xl={3}>
                                        <SongItemSquare
                                            song_id={song.id}
                                            song_data={song.data}
                                            selectSong={this.props.selectSong}
                                            likeSong={this.props.likeSong}
                                            unlikeSong={this.props.unlikeSong} />
                                    </Grid>
                                })
                            }
                        </Grid>
                        <div id={`year_${year}`} style={{ height: 24 }}></div>
                    </React.Fragment>
                })
            }
        </React.Fragment>
    }
}

export default SongListSquare;