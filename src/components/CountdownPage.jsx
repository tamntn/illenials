import React, { Component } from 'react';
import moment from 'moment';
import posed from 'react-pose';
import ReactGA from 'react-ga';
import PhoenixLoader from './PhoenixLoader';
import '../style/countdown-page.css';
import albumArtwork from '../images/album-artwork-square.jpg';

ReactGA.initialize('UA-143098154-1');
ReactGA.pageview('/');

const AlbumArtwork = posed.div({
    visible: {
        opacity: 1,
        transition: { duration: 1000 },
        scale: 1.0
    },
    hidden: {
        opacity: 0,
        transition: { duration: 1000 },
        scale: 1.05
    }
})

const CountdownBox = posed.div({
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 1000, delay: 1000 },
    },
    hidden: {
        y: 15,
        opacity: 0,
        transition: { duration: 1000 }
    }
})

const ScrollButton = posed.div({
    visible: {
        opacity: 1,
        transition: { duration: 1000, delay: 2000 }
    },
    hidden: {
        opacity: 0,
        transition: { duration: 1000 }
    }
})

class CountdownPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: undefined,
            hours: undefined,
            minutes: undefined,
            seconds: undefined,
            loading: true
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const then = moment('2019-08-16');
            const now = moment();
            const countdown = moment.duration(then.diff(now));
            const days = Math.floor(countdown.asDays());
            const hours = this.addPrecedingZero(countdown.hours());
            const minutes = this.addPrecedingZero(countdown.minutes());
            const seconds = this.addPrecedingZero(countdown.seconds());

            this.setState({ days, hours, minutes, seconds });
        }, 1000);

        setTimeout(() => {
            this.setState({ loading: false })
        }, 2500)
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    addPrecedingZero = (number) => {
        if (number < 10) {
            return `0${number}`
        } else {
            return number;
        }
    }

    render() {
        const { days, hours, minutes, seconds, loading } = this.state;

        if (loading) {
            return <PhoenixLoader />;
        }

        return (
            <div className="countdown-page-wrapper">
                <AlbumArtwork className="countdown-page-left" initialPose="hidden" pose="visible">
                    <img src={albumArtwork} alt="album-artwork" />
                </AlbumArtwork>
                <div className="countdown-page-right">
                    <CountdownBox className="countdown-box" initialPose="hidden" pose="visible">
                        <div className="countdown-unit">
                            <div className="countdown-number">{days}</div>
                            <div className="countdown-text">DAYS</div>
                        </div>
                        <div className="countdown-unit">
                            <div className="countdown-number">{hours}</div>
                            <div className="countdown-text">HOURS</div>
                        </div>
                        <div className="countdown-unit">
                            <div className="countdown-number">{minutes}</div>
                            <div className="countdown-text">MINUTES</div>
                        </div>
                        <div className="countdown-unit">
                            <div className="countdown-number">{seconds}</div>
                            <div className="countdown-text">SECONDS</div>
                        </div>
                    </CountdownBox>
                </div>
                <ScrollButton initialPose="hidden" pose="visible">
                    <a href="#" className="scroll-button"><span></span>Enter Site</a>
                </ScrollButton>
            </div>
        )
    }
}

export default CountdownPage;