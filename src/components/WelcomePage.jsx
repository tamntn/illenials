import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FirebaseContext } from '../firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Button } from '@material-ui/core';
import FullscreenMenu from './FullscreenMenu';
import '../style/welcome-page.css';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: undefined,
            menuVisible: false
        }
        this.uiConfig = {
            signInFlow: 'popup',
            signInSuccessUrl: '/audio',
            signInOptions: [
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    recaptchaParameters: {
                        'size': 'invisible',
                        'type': 'image'
                    }
                },
                {
                    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
                },
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
                }
            ],
            callbacks: {
                signInSuccessWithAuthResult: () => false,
            },
        };
    }

    componentDidMount() {
        const firebaseApp = this.context;
        this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
            this.setState({ isSignedIn: !!user });
        });
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }


    onOpenFullscreenMenu = () => {
        this.setState({ menuVisible: true });
        this.props.disableScrolling(true);
    }

    closeFullscreenMenu = () => {
        this.setState({ menuVisible: false });
        this.props.disableScrolling(false);
    }

    render() {
        const firebaseApp = this.context;
        console.log(firebaseApp)

        return <div className="welcome-page-wrapper">
            <div>Welcome fellow illenials,</div>
            <Button
                variant="outlined"
                size="large"
                color="primary"
                className="open-menu-button"
                onClick={this.onOpenFullscreenMenu}
            >Menu</Button>
            {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
                <div>
                    <StyledFirebaseAuth uiConfig={this.uiConfig}
                        firebaseAuth={firebaseApp.auth()} />
                </div>
            }
            {this.state.isSignedIn &&
                <div>
                    <div>Hello {firebaseApp.auth().currentUser.displayName}. You are now signed In!</div>
                    <a onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
                </div>
            }
            {this.state.menuVisible ? <FullscreenMenu close={this.closeFullscreenMenu} /> : null}
        </div>
    }
}

WelcomePage.contextType = FirebaseContext;

export default WelcomePage;