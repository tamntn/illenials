import React from 'react';
import ReactGA from 'react-ga';
import moment from 'moment';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FirebaseContext, firebaseApp } from './firebase';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Home from './views/Home';
import Credits from './views/Credits';
import Profile from './views/Profile';
import SignIn from './views/SignIn';
import Songs from './views/Songs';
import NotFound404 from './views/NotFound404';

ReactGA.initialize('UA-143098154-1');
ReactGA.pageview(window.location.pathname);

const AppMessage = withStyles({
	root: {
		backgroundColor: 'rgba(0, 0, 0, 0.95)',
		border: '1px solid #f6e3b2'
	},
	message: {
		color: 'white',
		fontFamily: "'Rajdhani', sans-serif",
		fontSize: '17px',
		fontWeight: '500'
	}
})(SnackbarContent);

const CloseMessageIcon = withStyles({
	root: {
		color: '#f6e3b2'
	}
})(CloseIcon)

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
			isSignedIn: undefined,
			viewMessage: false,
			message: ""
		}
	}

	componentDidMount() {
		this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
			this.setState({ isSignedIn: !!user });
		});
	}

	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	handleOpenMessage = (message) => {
		this.setState({ viewMessage: true, message })
	}

	handleCloseMessage = () => {
		this.setState({ viewMessage: false, message: "" })
	}

	render() {
		const { isSignedIn, viewMessage, message } = this.state;

		return (
			<ThemeProvider theme={theme}>
				<FirebaseContext.Provider value={firebaseApp}>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" render={(props) => <Home {...props} isSignedIn={isSignedIn} />} />
							<Route path="/home" render={(props) => <Home {...props} isSignedIn={isSignedIn} />} />
							<Route path="/signin" render={(props) => <SignIn {...props} isSignedIn={isSignedIn} openMessage={this.handleOpenMessage} />} />
							<Route path="/profile" render={(props) => <Profile {...props} isSignedIn={isSignedIn} openMessage={this.handleOpenMessage} />} />
							<Route path="/credits" component={Credits} />
							<Route path="/songs" render={(props) => <Songs {...props} isSignedIn={isSignedIn} openMessage={this.handleOpenMessage} />} />
							<Route component={NotFound404} />
						</Switch>
					</BrowserRouter>
				</FirebaseContext.Provider>
				<Snackbar
					key={moment()}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={viewMessage}
					autoHideDuration={8000}
					onClose={this.handleCloseMessage}
				>
					<AppMessage
						message={message}
						action={[<CloseMessageIcon onClick={this.handleCloseMessage} />]}
					/>
				</Snackbar>
			</ThemeProvider>
		);
	}
}

export default App;