import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SwipeableDrawer } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import '../../style/song-vote/leaderboard.css';

const LeaderboardDrawer = withStyles({
    root: {
        backgroundColor: 'transparent',
    },
    paperAnchorTop: {
        background: 'rgba(0, 0, 0, 0.85)',
        borderBottom: '16px'
    }
})(SwipeableDrawer);

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onClose = () => {
        this.props.closeLeaderboard();
    }

    render() {
        return <LeaderboardDrawer
            anchor="top"
            open={this.props.open}
            onClose={() => this.onClose()}
            onOpen={event => console.log(event)}
        >
            <div className="leaderboard">
                <FontAwesomeIcon icon={faAngleUp} className="collapse-button"
                    onClick={() => this.onClose()}
                />
            </div>
        </LeaderboardDrawer>
    }
}

export default Leaderboard;