import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import logo from '../../assets/logo1.png';
import './navbar.css';
import Signinmodal from '../../components/modals/signin/Signinmodal';
import Signupmodal from '../../components/modals/signup/Signupmodal';

const Navbar = ({signIn, signUp, setisAuthenticated}) => {
    const [displaySigninModal, setdisplaySigninModal] = useState(false);
    const [displaySignupModal, setdisplaySignupModal] = useState(false);

    const toggleSignInModal = () => {
        setdisplaySigninModal(!displaySigninModal);
    }

    const toggleSignUpModal = () => {
        setdisplaySignupModal(!displaySignupModal);
    }

    return (
        <div className="navbar-container">
            <div className="navbar-logo-container">
                <img className="navbar-logo" src={logo} alt="" />
            </div>
            <div className="navbar-buttons">
                <Button className="navbar-login" variant="contained" size="large"
                onClick={toggleSignInModal}
                >Log In</Button>
                <Button className="navbar-signup" variant="contained" size="large"
                onClick={toggleSignUpModal}
                >Sign Up</Button>
            </div>
        {displaySigninModal && <Signinmodal toggleSignInModal={toggleSignInModal} signIn={signIn} setisAuthenticated={setisAuthenticated}/>}
        {displaySignupModal && <Signupmodal toggleSignUpModal={toggleSignUpModal} signUp={signUp} setisAuthenticated={setisAuthenticated}/>}
        </div>
    )
}

export default Navbar;