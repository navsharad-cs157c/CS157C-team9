import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import Profile from './pages/Profile/Profile';
import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Posting from './pages/Posting/Posting';
import Search from './pages/Search/Search';

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('un@gmail.com');
  const [userInfoUpdate, setUserInfoUpdate] = useState(false);

  let signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signin", {email: email, password: password});
      if (response.data.status == 200) {
        console.log('good status');
        setisAuthenticated(true);
        setUserInfoUpdate(!userInfoUpdate);
        setUserEmail(email);
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  let signUp = async (email, name, password, picture) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signup", {email: email, name: name, password: password, picture: picture});
      if (response.data.status == 200) {
        console.log('good status');
        setUserEmail(email);
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  let fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/info/${userEmail}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

    // updates user info when they edit info in profile page
    let updateUserInfo = async (name, picture, bio) => {
      try {
        const response = await axios.post(`http://localhost:5000/user/update/${userEmail}`, {name: name, picture: picture, bio: bio, userEmail: userEmail});
        if (response.data.status == 200) {
          console.log('good status');
          setUserInfoUpdate(!userInfoUpdate);
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    }

  let setProduct = async (title, description, price, image) => {
    try {
      const response = await axios.post("http://localhost:5000/posting/setProduct", {title: title, description: description, price: price, image: image, userEmail: userEmail});
      if(response.data.status == 200) {
        console.log("good post status");
        return true;
      }
    }
    catch (err) {
      console.log("throwing error");
      console.log(err);
      return false;
    }
  }

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home signIn={signIn} signUp={signUp} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated}/>} />
      <Route path="/post" element={<Posting setProduct={setProduct}/>} />
      <Route path="/profile" element={<Profile signIn={signIn} signUp={signUp} 
        isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} fetchUserInfo={fetchUserInfo} updateUserInfo={updateUserInfo} userInfoUpdate={userInfoUpdate}/>} />
      <Route path="*" element={<Error />} />
      <Route path="/search" element={<Search signIn={signIn} signUp={signUp} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated}/>} />
      </Routes>
    </Router>
  )
}

// save for later - <Route path="/profile" element={isAuthenticated ? <Profile signIn={signIn} signUp={signUp} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} fetchUserInfo={fetchUserInfo}/> : <Navigate to="/" />} />

export default App;