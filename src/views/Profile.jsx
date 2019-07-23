import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, TextField, InputAdornment, Button } from '@material-ui/core';
import { Person, PhoneIphoneOutlined, EmailOutlined, PhotoCameraOutlined } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { FirebaseContext } from '../firebase';
import '../style/views/profile.css';

const ProfileTextField = withStyles({
    root: {
        fontFamily: "'Rajdhani', sans-serif"
    }
})(TextField);

const UpdateButton = withStyles({
    root: {
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600
    }
})(Button);

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            email: undefined,
            phone: undefined,
            imageUrl: undefined,
            currentUser: undefined
        }
    }

    componentDidMount() {
        this.fetchUserInfo();
    }

    componentDidUpdate() {
        this.fetchUserInfo();
    }

    fetchUserInfo = () => {
        if (this.props.isSignedIn === true && this.state.currentUser === undefined) {
            const firebaseApp = this.context;
            const { currentUser } = firebaseApp.auth();
            this.setState({
                name: currentUser.displayName ? currentUser.displayName : "",
                email: currentUser.email ? currentUser.email : "",
                phone: currentUser.phoneNumber ? currentUser.phoneNumber : "",
                imageUrl: currentUser.photoURL ? currentUser.photoURL : "",
                currentUser
            })
        }
    }

    updateUser = () => {
        const firebaseApp = this.context;
        const { currentUser } = firebaseApp.auth();

        Promise.all([
            currentUser.updateProfile({
                displayName: this.state.name,
                photoURL: this.state.imageUrl,
                phoneNumber: this.state.phone
            }),
            currentUser.updateEmail(this.state.email)
        ])
            .then(() => this.props.openMessage("Successfully updated your profile 👌🏻"))
            .catch((err) => this.props.openMessage(err.message))
    }

    render() {
        const { name, email, phone, imageUrl } = this.state;
        const { isSignedIn } = this.props;
        const peanutImageUrl = "https://firebasestorage.googleapis.com/v0/b/illenials-2019.appspot.com/o/peanut.jpg?alt=media&token=915c1472-8153-4fa9-8790-93779cc22c34";

        if (isSignedIn === undefined) return null;

        if (isSignedIn === false) {
            this.props.openMessage("You must sign in to access profile page.")
            return <Redirect to="/signin" />
        }

        return <div className="profile">
            <div className="title">ILLENIAL PROFILE</div>
            <div className="image">
                <img src={imageUrl ? imageUrl : peanutImageUrl} alt="profile"></img>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={3} xl={3}></Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className="form">
                        <ProfileTextField
                            id="profile-name"
                            label="Full Name"
                            InputLabelProps={{ style: { fontFamily: "'Rajdhani', sans-serif", fontSize: '17px' } }}
                            value={name}
                            onChange={(event) => this.setState({ name: event.target.value })}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
                                style: { fontFamily: "'Rajdhani', sans-serif", fontSize: '19px', fontWeight: 500 }
                            }}
                        />
                        <ProfileTextField
                            id="profile-email"
                            label="Email"
                            InputLabelProps={{ style: { fontFamily: "'Rajdhani', sans-serif", fontSize: '17px' } }}
                            value={email}
                            onChange={(event) => this.setState({ email: event.target.value })}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><EmailOutlined /></InputAdornment>,
                                style: { fontFamily: "'Rajdhani', sans-serif", fontSize: '19px', fontWeight: 500 }
                            }}
                        />
                        <ProfileTextField
                            id="profile-phone"
                            label="Phone Number"
                            InputLabelProps={{ style: { fontFamily: "'Rajdhani', sans-serif", fontSize: '17px' } }}
                            value={phone}
                            onChange={(event) => this.setState({ phone: event.target.value })}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            disabled
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PhoneIphoneOutlined /></InputAdornment>,
                                style: { fontFamily: "'Rajdhani', sans-serif", fontSize: '19px', fontWeight: 500 }
                            }}
                        />
                        <ProfileTextField
                            id="profile-image-url"
                            label="Profile Image URL"
                            InputLabelProps={{ style: { fontFamily: "'Rajdhani', sans-serif", fontSize: '17px' } }}
                            value={imageUrl}
                            onChange={(event) => this.setState({ imageUrl: event.target.value })}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PhotoCameraOutlined /></InputAdornment>,
                                style: { fontFamily: "'Rajdhani', sans-serif", fontSize: '19px', fontWeight: 500 }
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={3} xl={3}></Grid>
            </Grid>
            <div className="action">
                <UpdateButton variant="contained" color="primary" size="large" onClick={this.updateUser}>Save Changes</UpdateButton>
            </div>
        </div>
    }
}

Profile.contextType = FirebaseContext;

export default Profile;