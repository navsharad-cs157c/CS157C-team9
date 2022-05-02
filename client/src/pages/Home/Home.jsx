import Navbar from "../../components/navbar/Navbar";
import video from "../../assets/video.mp4";
import "./home.css";
import { useEffect, useState } from "react";
//import SearchBar from "material-ui-search-bar";
import SearchBar from "../../components/Search/SearchBar";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductCard from "../../components/Cards/ProductCard";
import Listings from "../../components/listings/Listings";


const Home = ({ signIn, signUp, setisAuthenticated, isAuthenticated, setChatWith, returnChatId }) => {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getProducts");
        console.log("Response",response.data);
        setProducts(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();

    console.log("Here 1");
  }, []);

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
            <span className="home-searchbar">
              <SearchBar data={products}/>
            </span>
          </div>
        </section>
      </div>
      <div className="home-listings">
        <h1 className="home-listings-header">Recent Listings</h1>
        <Listings setChatWith={setChatWith} returnChatId={returnChatId}/>
      </div>
    </div>
  );
};

export default Home;
