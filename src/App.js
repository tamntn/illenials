import React from 'react';
import ReactGA from 'react-ga';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FirebaseContext, firebaseApp } from './firebase';
import Home from './views/Home';
import Songs from './views/Songs';
import NotFound404 from './views/NotFound404';

ReactGA.initialize('UA-143098154-1');
ReactGA.pageview('/');

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			light: "#f6e3b2",
			main: "#f6e3b2",
			dark: "#f6e3b2"
		},
		text: {
			primary: "#f6e3b2",
			// secondary: "rgba(0, 0, 0, 0.54)",
			// disabled: "rgba(0, 0, 0, 0.38)",
			// hint: "rgba(0, 0, 0, 0.38)",
		},
		// divider: '#f6e3b2',
		// action: {
		// 	active: "rgba(0, 0, 0, 0.54)",
		// 	hover: "rgba(0, 0, 0, 0.08)",
		// 	hoverOpacity: 0.08,
		// 	selected: "rgba(0, 0, 0, 0.14)",
		// 	disabled: "rgba(0, 0, 0, 0.26)",
		// 	disabledBackground: "rgba(0, 0, 0, 0.12)",
		// }
	}
})

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<FirebaseContext.Provider value={firebaseApp}>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/audio" component={Songs} />
							<Route component={NotFound404} />
						</Switch>
					</BrowserRouter>
				</FirebaseContext.Provider>
			</ThemeProvider>
		);
	}
}

export default App;