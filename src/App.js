import React from 'react';
import ReactGA from 'react-ga';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Div100vh from 'react-div-100vh'
import Home from './views/Home';

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
			<Div100vh>
				<ThemeProvider theme={theme}>
					<Home />
				</ThemeProvider>
			</Div100vh>
		);
	}
}

export default App;
