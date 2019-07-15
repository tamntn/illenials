import React from 'react';
import '../style/style-views/not-found-404.css';

function NotFound404(props) {
    return <div className="not-found">
        <div className="not-found-text">Sorry... This page doesn't exist</div>
        <iframe src="https://tv.giphy.com/?username=illeniummusic" frameBorder="0" allowFullScreen></iframe>
    </div>
};

export default NotFound404;