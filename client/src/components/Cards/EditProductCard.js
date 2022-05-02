import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import noimage from "../../assets/no-image-available.png";

export default class EditProductCard extends Component {

    constructor(props){
        super(props);
        // console.log("title: " + props.title);
    }
    
    render() {
        return (
            
            <div className="card" style={{ width: '18rem', minHeight:'400px', marginBottom:'5%' }}>
                <img src={this.props.image} className="card-img-top" onError={(e)=>{e.target.onerror = null; e.target.src=noimage}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    {/* <p className="card-text">{this.props.price}</p> */}
                    <p className="card-text">Description: {this.props.description}</p>
                </div>
                <div class="card-footer"><small class="text-muted">Posted on {new Date(this.props.time_posted).toLocaleDateString()}</small></div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Asking Price : <span className='text-primary'>${this.props.price}</span> </li>
                </ul>
                <Link style={{textDecoration: 'none'}} to="/editpost" state={{ogTitle:this.props.title, ogDescription:this.props.description, ogPrice:this.props.price, ogImage:this.props.image, product_id:this.props.product_id}}><Button variant="outlined">Edit Post</Button></Link>
                <button variant="outlined" onClick={() => this.props.deletePostCheck(this.props.product_id)} >Delete Post</button>
            </div>
        );
    }
}