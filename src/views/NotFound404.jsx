import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import '../style/views/not-found-404.css';

class NotFound404 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            innerHeight: window.innerHeight
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        ReactGA.event({
            category: 'User',
            action: 'Viewed a 404 Page'
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
        this.setState({ innerHeight: window.innerHeight })
    }

    render() {
        return <div className="not-found" style={{ height: this.state.innerHeight }}>
            <div className="not-found-text">Sorry... This page doesn't exist 🥺</div>
            <Link to="/">Home</Link>
            <iframe
                src="https://tv.giphy.com/?username=illeniummusic"
                frameBorder="0"
                allowFullScreen
                title="404-giphy"
            ></iframe>
        </div>
    }
};

export default NotFound404;