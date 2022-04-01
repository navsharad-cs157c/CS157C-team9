import Navbar from '../../components/navbar/Navbar';
const Home = ({signIn, signUp, setisAuthenticated}) => {

    return (
        <div>
            <Navbar signIn={signIn} signUp={signUp} setisAuthenticated={setisAuthenticated}/>
            <h1>Home page still a work in progress :) </h1>
        </div>
    )
}

export default Home;