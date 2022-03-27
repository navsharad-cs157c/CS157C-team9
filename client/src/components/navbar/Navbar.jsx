import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import logo from '../../assets/logo1.png';
import './navbar.css';

const Navbar = () => {

    return (
        <div className="navbar-container">
            <div className="navbar-logo-container">
                <img className="navbar-logo" src={logo} alt="" />
            </div>
            <div className="navbar-buttons">
                <Button className="navbar-login" variant="contained" size="large"
                onClick={() => {
                    alert('call function here');
                  }}
                >Log In</Button>
                <Button className="navbar-signup" variant="contained" size="large"
                onClick={() => {
                    alert('call function here');
                  }}
                >Sign Up</Button>
            </div>

        </div>
    )
}

export default Navbar;