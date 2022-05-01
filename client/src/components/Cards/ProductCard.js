import React, { Component } from 'react';
import noimage from "../../assets/no-image-available.png";
export default class ProductCard extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="card" style={{ width: '18rem', minHeight:'400px', marginBottom:'5%' }}>
                <img src={this.props.image} className="card-img-top" onError={(e) => {e.target.onError = null; e.target.src = noimage}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    {/* <p className="card-text">{this.props.price}</p> */}
                    <p className="card-text">Description: {this.props.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Asking Price : <span className='text-primary card-title'>${this.props.price}</span> </li>
                </ul>
                <div class="card-footer"><small class="text-muted">Posted on {new Date(this.props.time_posted).toLocaleDateString()}</small></div>
            </div>
        );
    }
}