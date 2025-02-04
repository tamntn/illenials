import React, { Component } from 'react';
import moment from 'moment';
import posed from 'react-pose';
import PhoenixLoader from './PhoenixLoader';
import albumArtwork from '../images/album-artwork-square.jpg';
import '../style/countdown-page.css';

const AlbumArtwork = posed.div({
    visible: {
        opacity: 1,
        transition: { duration: 1000, ease: 'easeIn' },
        scale: 1.0
    },
    hidden: {
        opacity: 0,
        transition: { duration: 1000 },
        scale: 1.05
    }
})

const CountdownText = posed.div({
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 1000, delay: 1000, ease: 'easeIn' },
    },
    hidden: {
        y: 15,
        opacity: 0,
        transition: { duration: 1000 }
    }
})

const CountdownBox = posed.div({
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 1000, delay: 1000, ease: 'easeIn' },
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
        transition: { duration: 1000, delay: 2000, ease: 'easeIn' }
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
            const days = Math.floor(countdown.asDays()) * -1;
            // const hours = this.addPrecedingZero(countdown.hours());
            // const minutes = this.addPrecedingZero(countdown.minutes());
            // const seconds = this.addPrecedingZero(countdown.seconds());
            const hours = countdown.hours() * -1;
            const minutes = countdown.minutes() * -1;
            const seconds = countdown.seconds() * -1;

            this.setState({ days, hours, minutes, seconds });
        }, 1000);

        setTimeout(() => {
            this.setState({ loading: false });
        }, 1500)
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
                    <CountdownText className="countdown-out" initialPose="hidden" pose="visible">ASCEND OUT NOW!</CountdownText>
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
                <ScrollButton initialPose="hidden" pose="visible"
                    onClick={(event) => {
                        event.preventDefault();
                        this.props.goToPage(1)
                    }}
                >
                    <a href="/" className="scroll-button"><span></span>Enter Site</a>
                </ScrollButton>
            </div>
        )
    }
}

export default CountdownPage;