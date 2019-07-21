import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FirebaseContext } from '../firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import '../style/views/sign-in.css';
import '../style/views/firebaseui-styling.global.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.firebaseUiConfig = {
            signInFlow: 'popup',
            signInSuccessUrl: '/songs',
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
            ]
        };
    }

    render() {
        const firebaseApp = this.context;
        const { isSignedIn } = this.props;

        if (isSignedIn) {
            this.props.openMessage("You've already signed in. Welcome back!")
            return <Redirect to="/songs" />
        }

        return <div className="sign-in">
            {
                isSignedIn !== undefined && !isSignedIn
                &&
                <StyledFirebaseAuth
                    uiConfig={this.firebaseUiConfig}
                    firebaseAuth={firebaseApp.auth()} />
            }
        </div>
    }
}

SignIn.contextType = FirebaseContext;

export default SignIn;