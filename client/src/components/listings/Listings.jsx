import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductCard from "../../components/Cards/ProductCard";
import { useEffect, useState } from "react";

const Listings = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getProducts");
        // console.log("Response",response.data);
        let records = response.data;
        records = records.sort((b, a) => {
          return new Date(a.time_posted).getTime() - new Date(b.time_posted).getTime(); // descending date order
        });
        // console.log("Sorted Response", records);
        setProducts(records);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();

    console.log("Here 1");
  }, []);

  return (
    <div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {
                products.map(product =>(
                    <Grid key={product.product_id} style={{paddingLeft:'1%'}}>
                        <ProductCard image={product.image} title={product.title} price={product.price} description={product.description} time_posted={product.time_posted} asking_price={product.asking_price} />
                    </Grid>
                ))
            }
          </Grid>
      </div>
  );
};

export default Listings;