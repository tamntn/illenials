import React, { Component } from 'react';
import StickyYearDivider from './StickyYearDivider';
import SongItemFull from '../song-item/SongItemFull';
import { viewOptions } from '../../utils/view-options.js';

class SongListFull extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                        {
                            songs.map(song => {
                                return <SongItemFull key={song.id} song_data={song.data} />
                            })
                        }
                        <div id={`year_${year}`}></div>
                    </React.Fragment>
                })
            }
        </React.Fragment>
    }
}

export default SongListFull;