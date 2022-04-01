import React, {useState} from 'react';
import exit from '../../../assets/exit.png';
import './signupmodal.css';
import { Navigate } from "react-router-dom";

const Signupmodal = ({toggleSignUpModal, signUp}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isWrongInfo, setIsWrongInfo] = useState(false);

    const signUpCheck = async () => {
        let authentication = await signUp(email, name, password);
            if (authentication) {
                setIsWrongInfo(false);
                toggleSignUpModal();
                return <Navigate to='/user/profile' />
            } else {
                // display that username passowrd combo is wrong
                setIsWrongInfo(true);
            }

    }

    return (  
        <div className="signupmodal-container">
            <div className="signupmodal-box">
            <form>
                <span className="signupmodal-title">Sign Up</span>
                <div className="signupmodal-input-container">
                    <input type="text" required="" value={email} onChange={(e) => setEmail(e.target.value)}/>
		            <label>Email</label>	
                </div>
                <div className="signupmodal-input-container">
                    <input type="text" required="" value={name} onChange={(e) => setName(e.target.value)}/>
		            <label>Name</label>	
                </div>
                <div className="signupmodal-input-container">
                    <input type="password" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
		            <label>Password</label>	
                </div>
                <button type="button" className="btn" onClick={signUpCheck}>Sign Up</button>
            </form>
            {isWrongInfo && <p style={{color:"red"}}>This email is already in use.</p>}
            <img src={exit} alt="" className="signupmodal-exit-btn" onClick={toggleSignUpModal}/>
        </div>
        </div>
    );
}
 
export default Signupmodal;