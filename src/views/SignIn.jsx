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
            return <Redirect to="/songs" />
        }

        return <div className="sign-in">
            {
                isSignedIn !== undefined && !isSignedIn
                &&
                <React.Fragment>
                    <div className="title">SIGN IN</div>
                    <StyledFirebaseAuth
                        uiConfig={this.firebaseUiConfig}
                        firebaseAuth={firebaseApp.auth()} />
                    <div className="description">
                        <div>¹ Account signin is required in order to keep track of everyone's voting and make sure that each vote is unique.</div>
                        <div>² Your data is completely secured as authentication is done via Google Firebase. This website has no access to any of your data besides phone number (if you sign up with phone), and any other data you have already made publicly available on your Facebook/Google account.</div>
                        <div>³ This website will only send you text messages in order to notify you of when the voting starts or the voting results.</div>
                    </div>
                </React.Fragment>
            }
        </div>
    }
}

SignIn.contextType = FirebaseContext;

export default SignIn;