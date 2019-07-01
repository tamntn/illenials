import React, { Component } from 'react';
import moment from 'moment';
import PhoenixLoader from './PhoenixLoader';
import '../style/countdown-page.css';
import albumArtwork from '../images/album-artwork-square.jpg';

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
                <div className="countdown-page-left">
                    <img src={albumArtwork} />
                </div>
                <div className="countdown-page-right">
                    <div className="countdown-box">
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
                    </div>
                </div>
            </div>
        )
    }
}

export default CountdownPage;