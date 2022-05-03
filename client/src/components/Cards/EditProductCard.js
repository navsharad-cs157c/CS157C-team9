import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import noimage from "../../assets/no-image-available.png";

export default class EditProductCard extends Component {

    constructor(props){
        super(props);
        // console.log("title: " + props.title);
    }
    
    render() {
        return (
            <div className="card" style={{ width: '18rem', minHeight:'400px', marginBottom:'5%', margin: '30px' }}>
            <img src={this.props.image} className="card-img-top" onError={(e) => {e.target.onError = null; e.target.src = noimage}}/>
            <div className="card-body">
                <h5 className="card-title">{this.props.title}</h5>
                {/* <p className="card-text">{this.props.price}</p> */}
                <p className="card-text">{this.props.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Asking Price : <span className='text-primary card-title'>${this.props.price}</span> </li>
                <Link style={{textDecoration: 'none'}} to="/editpost" state={{ogTitle:this.props.title, ogDescription:this.props.description, ogPrice:this.props.price, ogImage:this.props.image, product_id:this.props.product_id}}><Button style={{width: '100%', minWidth: '100%'}}>Edit Post</Button></Link>
                <Button variant="contained" color="error" onClick={() => this.props.deletePostCheck(this.props.product_id)} >Delete Post</Button>
            </ul>
            <div class="card-footer"><small class="text-muted">Posted on {new Date(this.props.time_posted).toLocaleDateString()}</small></div>
        </div>
        );
    }
}