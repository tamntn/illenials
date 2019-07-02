import React from 'react';
import CountdownPage from './components/CountdownPage';
import Track from './components/Track';
import ReactPageScroller from "react-page-scroller";

function App() {
	return (
		// <React.Fragment>
			<ReactPageScroller>
				<CountdownPage />
				{/* <Track /> */}
				<div></div>
			</ReactPageScroller>
		// </React.Fragment>
	);
}

export default App;
