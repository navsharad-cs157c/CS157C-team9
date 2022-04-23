import React, {useState, useEffect} from 'react';
import exit from '../../../assets/exit.png';
import './signinmodal.css';
import { Navigate } from "react-router-dom";

const Signinmodal = ({toggleSignInModal, signIn, setisAuthenticated}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isWrongInfo, setIsWrongInfo] = useState(false);

    const signInCheck = async () => {
        let authentication = await signIn(email, password);
            if (authentication) {
                setIsWrongInfo(false);
                toggleSignInModal();
                setisAuthenticated(true);
                console.log('authenticated');
                // return <Navigate to='/user/profile' />
            } else {
                // display that username passowrd combo is wrong
                console.log('nah')
                setIsWrongInfo(true);
            }

    }

    return (  
        <div className="signinmodal-container">
            <div className="signinmodal-box">
            <form>
                <span className="signinmodal-title">Sign In</span>
                <div className="signinmodal-input-container">
                    <input type="text" name="email" required="" value={email} onChange={(e) => setEmail(e.target.value)}/>
		            <label>Email</label>	
                </div>
                <div className="signinmodal-input-container">
                    <input type="password" name="password" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
		            <label>Password</label>	
                </div>
                <button type="button" className="signin-btn" onClick={signInCheck}>Sign In</button>
            </form>
            {isWrongInfo && <p style={{color:"red"}}>Username/password combination is wrong.</p>}
            <img src={exit} alt="" className="signinmodal-exit-btn" onClick={toggleSignInModal}/>
        </div>
        </div>
    );
}
 
export default Signinmodal;