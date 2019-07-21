import React, { Component } from 'react';
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
            // callbacks: {
            //     signInSuccessWithAuthResult: (result) => console.log(result)
            // },
        };
    }

    render() {
        const firebaseApp = this.context;

        return <div className="sign-in" style={{ height: window.innerHeight }}>
            <StyledFirebaseAuth
                uiConfig={this.firebaseUiConfig}
                firebaseAuth={firebaseApp.auth()} />
        </div>
    }
}

SignIn.contextType = FirebaseContext;

export default SignIn;