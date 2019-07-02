import React from 'react';
import CountdownPage from './components/CountdownPage';
import WelcomePage from './components/WelcomePage';
import ReactPageScroller from "react-page-scroller";
import ReactFullpage from '@fullpage/react-fullpage';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disableScrolling: false
		}
	}

	disableScrolling = (value) => {
		this.setState({ disableScrolling: value })
	}

	render() {
		return (
			<ReactPageScroller
				animationTimer={500}
				blockScrollUp={this.state.disableScrolling ? true : false}
				blockScrollDown={this.state.disableScrolling ? true : false}
			>
				<CountdownPage />
				<WelcomePage disableScrolling={this.disableScrolling} />
			</ReactPageScroller>
		);
	}
}

export default App;
