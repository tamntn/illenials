import React from 'react';
import phoenixLoader from '../images/phoenix.gif';
import '../style/phoenix-loader.css';

function PhoenixLoader() {
    return (
        <div className="phoenix-loader-wrapper">
            <img src={phoenixLoader} alt="phoenix-loader" />
        </div>
    )
}

export default PhoenixLoader;