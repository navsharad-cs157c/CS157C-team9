import React, {useState, useEffect} from 'react';
import exit from '../../../assets/exit.png';
import './editinfo.css';

const EditInfo = ({toggleEditInfoModal}) => {
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [bio, setBio] = useState("");

    const updateInfoCheck = () => {

    }

    return (  
        <div className="editinfo-container">
            <div className="editinfo-box">
            <form>
                <span className="editinfo-title">Edit Info</span>
                <div className="editinfo-input-container">
                    <input type="text" name="name" required="" value={name} onChange={(e) => setName(e.target.value)}/>
		            <label>Name</label>	
                </div>
                <div className="editinfo-input-container">
                    <input type="text" name="picture" required="" value={picture} onChange={(e) => setPicture(e.target.value)}/>
		            <label>Profile Picture</label>	
                </div>
                <div className="editinfo-input-container">
                    <input type="text" name="bio" required="" value={bio} onChange={(e) => setBio(e.target.value)}/>
		            <label>Bio</label>	
                </div>
                <button type="button" className="btn" onClick={updateInfoCheck}>Update</button>
            </form>
            <img src={exit} alt="" className="editinfo-exit-btn" onClick={toggleEditInfoModal}/>
        </div>
        </div>
    );
}
 
export default EditInfo;