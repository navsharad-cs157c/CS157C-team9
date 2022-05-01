import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductCard from "../Cards/ProductCard";
import { useEffect, useState } from "react";
import "./filteredListings.css";

const FilteredListings = ({filteredProducts}) => {

  if(!filteredProducts){
    return null;
  }
  else{
    return (
      <div className="filtered-listings" >
        <div className="filtered-listings-header">
          Filtered Listings
        </div>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {
                filteredProducts ? 
                  filteredProducts.map(product =>(
                      <Grid key={product.product_id} style={{paddingLeft:'1%'}}>
                          <ProductCard image={product.image} title={product.title} price={product.price} description={product.description} time_posted={product.time_posted} asking_price={product.asking_price} />
                      </Grid>
                  )) : null
              }
            </Grid>
        </div>
    );
  }
  
};

export default FilteredListings;