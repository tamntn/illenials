import React, { Component } from 'react';
import '../style/style-views/not-found-404.css';

class NotFound404 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            innerHeight: window.innerHeight
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ innerHeight: window.innerHeight })
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
    }

    render() {
        return <div className="not-found" style={{ height: this.state.innerHeight }}>
            <div className="not-found-text">Sorry... This page doesn't exist</div>
            <iframe src="https://tv.giphy.com/?username=illeniummusic" frameBorder="0" allowFullScreen></iframe>
        </div>
    }
};

export default NotFound404;