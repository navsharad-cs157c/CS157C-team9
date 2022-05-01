import React, { Component } from 'react';

export default class ProductCard extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="card" style={{ width: '18rem', minHeight:'400px', marginBottom:'5%' }}>
                <img src={this.props.image} className="img-thumbnail" onError={(e)=>{e.target.onerror = null; e.target.src=""}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.price}</p>
                    <p className="card-text">Description: {this.props.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Asking Price : ${this.props.asking_price}</li>
                </ul>
            </div>
        );
    }
}