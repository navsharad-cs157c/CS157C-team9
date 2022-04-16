import './posting.css';
import React, {useState, useEffect} from 'react';

const Posting = ({setProduct}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    
    // Calling the method setProduct from App.js that communicates with the backend to set the products
    // When user clicks button, this method will be called which calls the method to tell the backend to input the info into the db
    // It then gets the result from that to know if it was successful or not
    const postingCheck = async () => {
        let test = "product:" + title;
        console.log(test);
        let result = await setProduct(title, description, price, image);
            if(result) {
                console.log('successful');
                // Clear the text boxes here probably and display success?
            } else {
                console.log('nah')
            }
    }

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
                </div>

                <div className="posting-input-container">
                    <label>Asking Price</label>
                    <input type="text" className="price" name="price" required="" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="posting-input-container">
                    <label>Image Link</label>
                    <input type="text" className="image" name="image" required="" value={image} onChange={(e) => setImage(e.target.value)}/>
                </div>
                <button type="button" className="btn1" onClick={postingCheck}>Post</button>
            </form>
        </div>
    );
}

export default Posting;