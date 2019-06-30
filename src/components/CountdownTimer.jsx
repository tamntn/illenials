import React, { Component } from 'react';
import moment from 'moment';
import albumArtwork from '../images/album-artwork-min.jpg';
import PhoenixLoader from './PhoenixLoader';
import '../App.css';

class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: undefined,
            hours: undefined,
            minutes: undefined,
            seconds: undefined
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
        const { days, hours, minutes, seconds } = this.state;

        if (!days) {
            return <PhoenixLoader />;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={albumArtwork} className="countdown-picture" alt="logo" />
                    <div className="countdown-wrapper">
                        <div className="countdown-box">
                            <div className="countdown-number">{days}</div>
                            <div className="countdown-text">DAYS</div>
                        </div>
                        <div className="countdown-box">
                            <div className="countdown-number">{hours}</div>
                            <div className="countdown-text">HOURS</div>
                        </div>
                        <div className="countdown-box">
                            <div className="countdown-number">{minutes}</div>
                            <div className="countdown-text">MINUTES</div>
                        </div>
                        <div className="countdown-box">
                            <div className="countdown-number">{seconds}</div>
                            <div className="countdown-text">SECONDS</div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default CountDown;