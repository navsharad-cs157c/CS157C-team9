import Navbar from "../../components/navbar/Navbar";
import video from "../../assets/video.mp4";
import "./home.css";
import { useEffect, useState } from "react";
import SearchBar from "../../components/Search/SearchBar";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductCard from "../../components/Cards/ProductCard";
import Listings from "../../components/listings/Listings";
import PriceFilter from "../../components/Filters/PriceFilter";
import FilteredListings from "../../components/listings/FilteredListings";

const Home = ({ signIn, signUp, setisAuthenticated, isAuthenticated, setChatWith, returnChatId }) => {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredProducts, setFilteredProducts] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getProducts");
        console.log("Response", response.data);
        setProducts(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();

    console.log("Here 1");
  }, []);

  const productFilters = (filterType, filter) => {
    const currentFilteredProducts = [];
    if (filterType === "price") {
      products.map((product) => {
        if (
          parseInt(product.price) >= parseInt(filter[0]) &&
          parseInt(product.price) <= parseInt(filter[1])
        ) {
          currentFilteredProducts.push(product);
        }
      });
    setFilteredProducts(currentFilteredProducts);
    }
    else if(filterType === "clearprice"){
      setFilteredProducts(false);
    }
  };
  return (
    <div>
      <Navbar
        signIn={signIn}
        signUp={signUp}
        setisAuthenticated={setisAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <div className="home-container">
        {/* Background Video */}
        <video src={video} muted loop autoPlay></video>

        {/* Text Content */}
        <section>
          <div className="home-text">
            <br />
            <br /> <h1>What Are You Looking For?</h1>
            <div className="home-search-container">
              <span className="home-searchbar">
                    <SearchBar data={products}/>
                  </span>
                  <span className="home-searchbar">
                    <PriceFilter productFilters={productFilters} />
                  </span>
            </div>
          </div>
        </section>
      </div>
      <div className="home-listings-container">
      {filteredProducts && <h1 className="home-listings-header">Filtered Listings</h1>}
      {filteredProducts && <FilteredListings filteredProducts={filteredProducts} isAuthenticated={isAuthenticated} setChatWith={setChatWith} returnChatId={returnChatId}/>}
      <div className="home-listings">
        <h1 className="home-listings-header">Recent Listings</h1>
        <Listings isAuthenticated={isAuthenticated} setChatWith={setChatWith} returnChatId={returnChatId}/>
      </div>
      </div>
    </div>
  );
};

export default Home;
