import React from 'react';
import ReactGA from 'react-ga';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CountdownPage from './components/CountdownPage';
import WelcomePage from './components/WelcomePage';
import ReactPageScroller from "react-page-scroller";

ReactGA.initialize('UA-143098154-1');
ReactGA.pageview('/');

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#7986cb",
			main: "#f6e3b2",
			dark: "#303f9f"
		}
	}
})

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
			<ThemeProvider theme={theme}>
				<ReactPageScroller
					animationTimer={500}
					blockScrollUp={this.state.disableScrolling ? true : false}
					blockScrollDown={this.state.disableScrolling ? true : false}
				>
					<CountdownPage />
					<WelcomePage disableScrolling={this.disableScrolling} />
				</ReactPageScroller>
			</ThemeProvider>
		);
	}
}

export default App;
