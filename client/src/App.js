import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import Profile from './pages/Profile/Profile';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('un@gmail.com');

  let signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signin", {email: email, password: password});
      if (response.data.status == 200) {
        console.log('good status');
        setisAuthenticated(true);
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

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home signIn={signIn} signUp={signUp} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated}/>} />
      <Route path="/profile" element={<Profile signIn={signIn} signUp={signUp} 
        isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} fetchUserInfo={fetchUserInfo}/>} />
      <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

// save for later - <Route path="/profile" element={isAuthenticated ? <Profile signIn={signIn} signUp={signUp} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} fetchUserInfo={fetchUserInfo}/> : <Navigate to="/" />} />

export default App;