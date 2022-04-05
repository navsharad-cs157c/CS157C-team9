import Button from '@material-ui/core/Button';
import './error.css';
import Logo from '../../assets/logo1.png';
import { Link } from "react-router-dom";


const Error = () => {

    return (
        <div className="error-container">
        <img src={Logo} alt="" />
        <h1>This page does not exist :(</h1>
        <Link to="/"><Button style={{color: "white"}} variant="outlined">Click here to go back home</Button></Link>
        </div>
    )
}

export default Error;