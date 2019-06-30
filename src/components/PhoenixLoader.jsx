import React from 'react';
import phoenixLoader from '../images/phoenix.gif';
import '../style/phoenix-loader.css';

function PhoenixLoader() {
    return (
        <div className="phoenix-loader-wrapper">
            {/* <img src={phoenixLoader} alt="phoenix-loader" /> */}
            <iframe src="https://giphy.com/embed/6Kc9qY44PfOs5nGTQK" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </div>
    )
}

export default PhoenixLoader;