import Navbar from '../../components/navbar/Navbar';
import SearchBar from "../../components/Search/SearchBar";
import './search.css';
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductCard from "../../components/Cards/ProductCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import FilteredListings from "../../components/listings/FilteredListings";

const Search = ({ signIn, signUp, setisAuthenticated, isAuthenticated, setChatWith, returnChatId, userEmail }) => {
    const [products, setProducts] = useState([]);
    const [locationState, setLocationState] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [userInput, setUserInput] = useState("");

    const location = useLocation();

    const handleFilter = event => {
        const searchWord = event.target.value;
        setUserInput(searchWord);
        const newFilter = products.filter(value => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === ""){
            setFilteredData(products);
        } else {
            setFilteredData(newFilter);
        }
    };

    const handleChange = event => {
        if (event.target) {
            handleFilter(event);
        } else {
            const searchWord = event;
            setUserInput(searchWord);
            const newFilter = products.filter(value => {
                return value.title.toLowerCase().includes(searchWord.toLowerCase());
            });
    
            if (searchWord === ""){
                setFilteredData(products);
            } else {
                setFilteredData(newFilter);
            }
        }
    }

    useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setUserInput(location.state.userInput);
            console.log(locationState)
        }
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
    
      }, []);

      useEffect(() => {
          if (products) {
              setFilteredData(products);
              if (userInput) handleChange(userInput);
            }
      }, [products]);

    return (
        <div className="search-page">
            <Navbar
            signIn={signIn}
            signUp={signUp}
            setisAuthenticated={setisAuthenticated}
            isAuthenticated={isAuthenticated}
            />
            <div className="search-page-container">
                <div className="searchbar-container">
                    <div className="searchInputs">
                        <input type="text" placeholder="Search..." value={userInput} onChange={handleChange}/>
                        <div className="searchIcon">
                            <SearchIcon />
                        </div>
                    </div>
                </div>
                <div className="search-page-listings">
                <FilteredListings filteredProducts={filteredData} isAuthenticated={isAuthenticated} setChatWith={setChatWith} returnChatId={returnChatId} userEmail={userEmail}/>
                </div>
            </div>
        </div>
    )
}

export default Search;