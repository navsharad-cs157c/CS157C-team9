import React, { Component } from 'react';
import noimage from "../../assets/no-image-available.png";
import Button from "@mui/material/Button";
import { Navigate } from 'react-router-dom';

export default class ProductCard extends Component {

    constructor(props){
        super(props);
        this.state = {navigateUser: false}
    }

    // componentDidMount() {
    //     this.setState({
    //         navigateUser: false
    //     })
    // }

    contactSeller(email) {
        let uid = this.props.returnChatId(email);
        this.props.setChatWith(uid);
        this.setState({
            navigateUser: true
        })
    }


    render() {

        if (this.state.navigateUser) {
            return (
                <Navigate to="/messages" />
            )
        }

        return (
            <div className="card" style={{ width: '18rem', minHeight:'400px', marginBottom:'5%' }}>
                <img src={this.props.image} className="card-img-top" onError={(e) => {e.target.onError = null; e.target.src = noimage}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    {/* <p className="card-text">{this.props.price}</p> */}
                    <p className="card-text">{this.props.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Asking Price : <span className='text-primary card-title'>${this.props.price}</span> </li>
                    { this.props.isAuthenticated && <Button className="btn-secondary" onClick={() => this.contactSeller(this.props.poster_email)}>Contact Seller</Button>}
                </ul>
                <div class="card-footer"><small class="text-muted">Posted on {new Date(this.props.time_posted).toLocaleDateString()}</small></div>
            </div>
        );
    }
}