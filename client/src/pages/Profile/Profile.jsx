import React, {useState, useEffect} from 'react';
import Navbar from '../../components/navbar/Navbar';
import EditInfo from '../../components/modals/editinfo/EditInfo';
import EditProductCard from "../../components/Cards/EditProductCard";
import Grid from "@mui/material/Grid";
import './profile.css';
import Button from '@material-ui/core/Button';
import { Navigate, Link } from 'react-router-dom';
import { containerClasses } from '@mui/material';

const Signinmodal = ({signIn, signUp, setisAuthenticated, isAuthenticated, fetchUserInfo, setUserInfoUpdate, userInfoUpdate, updateUserInfo, fetchProducts, userEmail, deletePost}) => {
    const [userInfo, setUserInfo] = useState({name: 'default', picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png", bio: 'Add a bio by clicking edit info!'});
    const [displayEditInfoModal, setDisplayEditInfoModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [postDeleted, setPostDeleted] = useState(false);

    const toggleEditInfoModal = () => {
        setDisplayEditInfoModal(!displayEditInfoModal);
    }

    const loadPosts = async () => {
        let result = await fetchProducts();
            if(result) {
                console.log('successful');
            
                const userProducts = result.data.filter(value => {
                    return value.poster_email.toLowerCase().includes(userEmail.toLowerCase());
                });
                setProducts(userProducts);
                console.log(products);
            } else {
                console.log('nah')
            }
    }

    const deletePostCheck = async (key) => {
        let result = await deletePost(key);
            if(result) {
                console.log('successful');
                setPostDeleted(!postDeleted);
            } else {
                console.log('nah')
            }
    }

    useEffect(async () => {
        if (isAuthenticated) {
            let info = await fetchUserInfo();
            setUserInfo(info);
        }

        loadPosts(); // Fetch user's products

    }, [userInfoUpdate]);

    useEffect(() => {
        loadPosts();
    }, [postDeleted]);

    return (  
        <div>
        {isAuthenticated ?
        <div>
            <Navbar signIn={signIn} signUp={signUp} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated}/>
            <div className="profile-container">
                <div className="profile-user-details">
                <img src={userInfo.picture} alt="" />
                <h1>{userInfo.name}</h1>
                <h4>{userInfo.bio ? userInfo.bio : 'Add your bio by clicking edit info!'}</h4>
                <Button style={{color: "white"}} variant="outlined" onClick={toggleEditInfoModal}>Edit Info</Button>
                </div>
                <div className="profile-listings-container">
                    <span className="profile-listings-header">
                        <h1>My Listings</h1>
                        <Link style={{textDecoration: 'none'}} to="/post"><Button style={{marginTop: "30px", marginLeft: "30px"}} variant="outlined">Add New Listing</Button></Link>
                    </span>
                    <div className="profile-listings-body">
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                        {
                            products.map(product =>(
                                <Grid key={product.product_id} style={{paddingLeft:'1%'}}>
                                    <EditProductCard image={product.image} title={product.title} price={product.price} description={product.description} time_posted={product.time_posted} asking_price={product.asking_price} product_id={product.product_id} deletePostCheck={deletePostCheck}/>
                                </Grid>
                            ))
                        }
                        </Grid>
                    </div>
                </div>
            </div>
            {displayEditInfoModal && <EditInfo userInfoUpdate={userInfoUpdate} setUserInfoUpdate={setUserInfoUpdate} toggleEditInfoModal={toggleEditInfoModal} updateUserInfo={updateUserInfo} />}
        </div>

: <Navigate to="/" />}
        </div>
    )
}
 
export default Signinmodal;