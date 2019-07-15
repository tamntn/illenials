import React from 'react';
import '../style/phoenix-loader.css';

function PhoenixLoader() {
    return (
        <div className="phoenix-loader-wrapper">
            <iframe src="https://giphy.com/embed/6Kc9qY44PfOs5nGTQK" frameBorder="0" className="giphy-embed" allowFullScreen title="loader-giphy"></iframe>
        </div>
    )
}

export default PhoenixLoader;