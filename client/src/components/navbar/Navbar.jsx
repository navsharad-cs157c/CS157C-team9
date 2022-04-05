import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import logo from '../../assets/logo1.png';
import './navbar.css';
import Signinmodal from '../../components/modals/signin/Signinmodal';
import Signupmodal from '../../components/modals/signup/Signupmodal';
import { Link } from "react-router-dom";

const Navbar = ({signIn, signUp, setisAuthenticated, isAuthenticated}) => {
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
            <Link to="/"><img className="navbar-logo" src={logo} alt="" /></Link>
            <div className="navbar-buttons">
                {isAuthenticated && <Link style={{textDecoration: 'none'}} to="/profile"><Button variant="contained" size="large">User Profile</Button></Link>}
                {isAuthenticated && <Button  style={{backgroundColor: 'red', color: 'white'}} variant="contained" size="large" onClick={() => setisAuthenticated(false)}>Log Out</Button>}
                {!isAuthenticated && <Button className="navbar-login" variant="contained" size="large" onClick={toggleSignInModal}>Log In</Button>}
                {!isAuthenticated && <Button className="navbar-signup" variant="contained" size="large" onClick={toggleSignUpModal}>Sign Up</Button>}
                
            </div>
        {displaySigninModal && <Signinmodal toggleSignInModal={toggleSignInModal} signIn={signIn} setisAuthenticated={setisAuthenticated}/>}
        {displaySignupModal && <Signupmodal toggleSignUpModal={toggleSignUpModal} signUp={signUp} setisAuthenticated={setisAuthenticated}/>}
        </div>
    )
}

export default Navbar;