import React, { Component } from 'react';
import Sticky from 'react-stickynode';
import '../../style/song-list/sticky-year-divider.css';

class StickyYearDivider extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { year } = this.props;

        return <Sticky enabled={true} bottomBoundary={`#year_${year}`}>
            <div className={`sticky-year-divider`}>
                <div className="text">{`${year}`}</div>
                <div className="action" onClick={() => this.props.openLeaderboard()}>LEADERBOARD</div>
            </div>
        </Sticky>
    }
}

export default StickyYearDivider;