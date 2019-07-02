import React, { Component } from 'react';
import axios from 'axios';
import recapVideo from '../images/recap-min.mp4';
import '../style/track.css'

const client_id = 'e1d8a0bf93194233bade813ea2479021';
const client_secret = '971c68c95f4745bbbc9b6c0f53da4ec4';

// const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     form: {
//         grant_type: 'client_credentials'
//     },
//     json: true
// };

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            data: {
                grant_type: 'client_credentials'
            }
        }).then(response => console.log(response));
    }

    render() {
        return (
            <div className="fullscreen-menu-wrapper">
                <div className="menu-left">
                    <video className="menu-video" playsInline autoPlay muted loop>
                        <source src={recapVideo} type="video/mp4"></source>
                    </video>
                    {/* <iframe src="http://tv.giphy.com/?username=illeniummusic" frameBorder="0" allowFullScreen></iframe> */}
                </div>
                <div className="menu-right">
                    <h2>Home</h2>
                    <h2>Bracket</h2>
                    <h2>About</h2>
                </div>
            </div>
        )
    }
}

export default Track;