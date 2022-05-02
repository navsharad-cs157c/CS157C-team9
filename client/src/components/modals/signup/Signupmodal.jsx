import React, {useState} from 'react';
import exit from '../../../assets/exit.png';
import './signupmodal.css';
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Signupmodal = ({toggleSignUpModal, signUp, setisAuthenticated}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isWrongInfo, setIsWrongInfo] = useState(false);

    const notifyUserCreated = () => {
        toast('You Have Successfully Signed Up!', {position: toast.POSITION.BOTTOM_RIGHT})
    }

    const signUpCheck = async () => {
        let picture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'; // default user profile picture
        let authentication = await signUp(email, name, password, picture);
            if (authentication) {
                setIsWrongInfo(false);
                toggleSignUpModal();
                notifyUserCreated();
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
                <button type="button" className="signup-btn" onClick={signUpCheck}>Sign Up</button>
            </form>
            {isWrongInfo && <p style={{color:"red"}}>This email is already in use.</p>}
            <img src={exit} alt="" className="signupmodal-exit-btn" onClick={toggleSignUpModal}/>
        </div>
        </div>
    );
}
 
export default Signupmodal;