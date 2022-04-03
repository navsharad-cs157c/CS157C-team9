import Navbar from '../../components/navbar/Navbar';
import video from '../../assets/video.mp4';
import './home.css';
import SearchBar from "material-ui-search-bar";

const Home = ({signIn, signUp, setisAuthenticated, isAuthenticated}) => {

    return (
        <div>
            <Navbar signIn={signIn} signUp={signUp} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated}/>
            <div className="home-container">
                {/* Background Video */}
                <video src={video} muted loop autoPlay></video>

                {/* Text Content */}
                <section>
                    <div className="home-text">
                    <br /><br/> <h1>What Are You Looking For?</h1>
                    <span >< SearchBar className="home-searchbar"/></span>
                    </div>
                </section>
                
            </div>
            <div className="home-listings">
                <h1 className="home-listings-header">
                    Recent Listings
                </h1>
                <p>Here is where we will display the products after getting them from the server with a "get" request. We can use the javascript "map" function to map all the products into 
                    listing components. We can use "css grid" to make it look nice
                </p>
            </div>
        </div>
    )
}

export default Home;