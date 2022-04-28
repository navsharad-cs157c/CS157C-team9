import './editpost.css';
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';

const EditPost = ({updatePost}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [key, setKey] = useState("");
    const [flag, setFlag] = useState(false);
    
    const location = useLocation();
    

    const updatePostCheck = async () => {
        
        let result = await updatePost(title, description, price, image, key);
            if(result) {
                console.log('successful');
                console.log("productid: " + result.data);
            } else {
                console.log('nah')
            }
    }

    useEffect(async () => {
        
        if (location.state && flag == false) {
            console.log(location.state)
            setTitle(location.state.ogTitle);
            setDescription(location.state.ogDescription);
            setPrice(location.state.ogPrice);
            setImage(location.state.ogImage);
            setKey(location.state.product_id);

            setFlag(true); // To prevent the text fields from being reset to the inital values after the first render
        }

    });

    return (  
        
        <div className="posting-container">
             <form>
                 <span className="info">Enter Information About the Item You Wish To Sell</span>
                <div className="posting-input-container">
                    <label>Title</label>	
                    <input type="text" name="product-title" required="" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
        
                <div className="posting-input-container">
                    <label>Product Description</label>	
                    <input type="text" className="description" name="description" required="" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    {/* <textarea className='description' name="description" required="" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                </div>

                <div className="posting-input-container">
                    <label>Asking Price</label>
                    <input type="text" className="price" name="price" required="" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="posting-input-container">
                    <label>Image Link</label>
                    <input type="text" className="image" name="image" required="" value={image} onChange={(e) => setImage(e.target.value)}/>
                </div>
                
                <Link style={{textDecoration: 'none'}} variant="outlined" to='/profile'> <Button style={{ backgroundColor: "dodgerblue", marginBottom: "30px", marginLeft: "30px"}} type="button" className="btn1" onClick={updatePostCheck}>Update Post</Button> </Link>
            </form>
        </div>
    );
}

export default EditPost;