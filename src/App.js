import React from 'react';
import ReactGA from 'react-ga';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CountdownPage from './components/CountdownPage';
import WelcomePage from './components/WelcomePage';
import ReactPageScroller from "react-page-scroller";
// import ReactFullpage from '@fullpage/react-fullpage';

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

	componentDidMount() {
		window.addEventListener('keydown', this.goToPage);
	}

	disableScrolling = (value) => {
		this.setState({ disableScrolling: value })
	}

	goToPage = (pageNumber) => {
		console.log('down');
		this.reactPageScroller.goToPage(pageNumber);
	  }

	render() {
		return (
			<ThemeProvider theme={theme}>
				<ReactPageScroller
					ref={c => this.reactPageScroller = c}
					animationTimer={500}
					blockScrollUp={this.state.disableScrolling ? true : false}
					blockScrollDown={this.state.disableScrolling ? true : false}
				>
					<CountdownPage />
					<WelcomePage disableScrolling={this.disableScrolling} />
				</ReactPageScroller>
			</ThemeProvider>
			// <ReactFullpage
			// 	render={({ state, fullpageApi }) => {
			// 		return (
			// 			<ReactFullpage.Wrapper>
			// 				<CountdownPage />
			// 				<WelcomePage />
			// 			</ReactFullpage.Wrapper>
			// 		);
			// 	}}
			// />
		);
	}
}

export default App;
