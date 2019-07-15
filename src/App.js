import React from 'react';
import ReactGA from 'react-ga';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import AudioPlayer from './components/AudioPlayer';
import NotFound404 from './views/NotFound404';

import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
	apiKey: "AIzaSyCEOopC9paw5TwmTklec8bbRKHUhQjrw_k",
	authDomain: "illenials-2019.firebaseapp.com",
	databaseURL: "https://illenials-2019.firebaseio.com",
	projectId: "illenials-2019",
	storageBucket: "illenials-2019.appspot.com",
	messagingSenderId: "365562628837",
	appId: "1:365562628837:web:7b1b44d4c89f385a"
});

var db = firebase.firestore();

var songsRef = db.collection('songs')

songsRef.get().then(querySnapshot => {
	querySnapshot.forEach(doc => {
		console.log(doc.data().likes.length);
	});
})

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
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/audio" component={AudioPlayer} />
						<Route component={NotFound404} />
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		);
	}
}

export default App;