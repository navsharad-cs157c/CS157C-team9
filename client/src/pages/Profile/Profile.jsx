import React, {useState, useEffect} from 'react';
import Navbar from '../../components/navbar/Navbar';
import EditInfo from '../../components/modals/editinfo/EditInfo';
import './profile.css';
import Button from '@material-ui/core/Button';
import { Navigate, Link } from 'react-router-dom';

const Signinmodal = ({signIn, signUp, setisAuthenticated, isAuthenticated, fetchUserInfo, setUserInfoUpdate, userInfoUpdate, updateUserInfo}) => {
    const [userInfo, setUserInfo] = useState({name: 'default', picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png", bio: 'Add a bio by clicking edit info!'});
    const [displayEditInfoModal, setDisplayEditInfoModal] = useState(false);

    const toggleEditInfoModal = () => {
        setDisplayEditInfoModal(!displayEditInfoModal);
    }

    useEffect(async () => {
        if (isAuthenticated) {
            let info = await fetchUserInfo();
            setUserInfo(info);
        }
        
    }, [userInfoUpdate]);

    return (  
        <div>
        {isAuthenticated ?
        <div>
            <Navbar signIn={signIn} signUp={signUp} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated}/>
            <div className="profile-container">
                <div className="profile-user-details">
                <img src={userInfo.picture} alt="" />
                <h1>{userInfo.name}</h1>
                <h4>{userInfo.bio ? userInfo.bio : 'Add your bio by clicking edit info!'}</h4>
                <Button style={{color: "white"}} variant="outlined" onClick={toggleEditInfoModal}>Edit Info</Button>
                </div>
                <div className="profile-listings-container">
                    <span className="profile-listings-header">
                        <h1>My Listings</h1>
                        <Link style={{textDecoration: 'none'}} to="/post"><Button style={{marginTop: "30px", marginLeft: "30px"}} variant="outlined">Add New Listing</Button></Link>
                    </span>
                </div>
            </div>
            {displayEditInfoModal && <EditInfo userInfoUpdate={userInfoUpdate} setUserInfoUpdate={setUserInfoUpdate} toggleEditInfoModal={toggleEditInfoModal} updateUserInfo={updateUserInfo}/>}
        </div>

: <Navigate to="/" />}
        </div>
    )
}
 
export default Signinmodal;