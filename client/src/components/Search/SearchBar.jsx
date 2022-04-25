import './searchbar.css';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ initialValue="", data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [userInput, setUserInput] = useState(initialValue);


    const handleFilter = event => {
        const searchWord = event.target.value;
        setUserInput(searchWord);
        const newFilter = data.filter(value => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === ""){
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };


    return (
        <div className="searchbar-container">
            <div className="searchInputs">
                <input type="text" placeholder="Search..." value={userInput} onChange={handleFilter}/>
                <div className="searchIcon">
                    <SearchIcon />
                </div>
            </div>
            {filteredData.length != 0 &&
            <div className="dataResult">
                {filteredData.slice(0,15).map((value, key) => {
                    return( <Link to="/search" state={{data: data, userInput: value.title}}><a className="dataItem"> <p>{value.title}</p></a></Link>);
                })}
            </div>
            }

        </div>
    )
}

export default SearchBar;