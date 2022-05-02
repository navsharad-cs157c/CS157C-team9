import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import Profile from './pages/Profile/Profile';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Posting from './pages/Posting/Posting';
import Search from './pages/Search/Search';
import EditPost from './pages/EditPost/EditPost';
import Messages from './pages/Messages/Messages';
import { CometChat } from "@cometchat-pro/chat";

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('un@gmail.com');
  const [userInfoUpdate, setUserInfoUpdate] = useState(false);
  const [chatWith, setChatWith] = useState('');


  useEffect(() => {
    if (!isAuthenticated) {
    CometChat.logout().then(
      () => {
        console.log("Logout completed successfully");
      }, error=>{
        console.log("Logout failed with exception:",{error});
      }
    );
    }
  }, [isAuthenticated]);

  const appID = process.env.REACT_APP_COMETCHAT_APPID;
  const region = process.env.REACT_APP_COMETCHAT_REGION;
  const auth = process.env.REACT_APP_COMETCHAT_AUTH;

  let signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signin", {email: email, password: password});
      if (response.data.status == 200) {
        console.log('good status');
        setisAuthenticated(true);
        setUserInfoUpdate(!userInfoUpdate);
        setUserEmail(email);
        let uid = returnChatId(email);
        console.log(uid);
        CometChat.login(uid, auth).then(
          user => {
            console.log("Login Successful:", { user });    
          },
          error => {
            console.log("Login failed with exception:", { error });    
          }
        );
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
        let uid = returnChatId(email);
        console.log(uid);
        let user = new CometChat.User(uid);
        user.setName(name);
        CometChat.createUser(user, auth).then(
          user => {
              console.log("user created", user);
          },error => {
              console.log("error", error);
          }
      )
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

  let fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getProducts");
      //console.log("Response",response.data);
      return response;
      //setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  let updatePost = async (title, description, price, image, key) => {
    try {
      const response = await axios.post("http://localhost:5000/post/editPost", {title: title, description: description, price: price, image: image, userEmail: userEmail, key: key});
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

  let deletePost = async (key) => {
    try {
      const response = await axios.post("http://localhost:5000/post/deletePost", {key: key});
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

  // removes special characters from user email to be able to use as UID for chat app
  let returnChatId = (email) => {
    let str = email.replace(/\./g,''); // remove periods
    let uid = str.replace('@', ''); // remove @ sign
    return uid;
  }

  function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
  

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home signIn={signIn} signUp={signUp} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} setChatWith={setChatWith} returnChatId={returnChatId}/>} />
      <Route path="/post" element={<Posting setProduct={setProduct}/>} />
      <Route path="/editpost" element={<EditPost updatePost={updatePost}/>} />
      <Route path="/profile" element={<Profile signIn={signIn} signUp={signUp} 
        isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} fetchUserInfo={fetchUserInfo} updateUserInfo={updateUserInfo} userInfoUpdate={userInfoUpdate} 
        fetchProducts={fetchProducts} userEmail={userEmail} deletePost={deletePost}/>} />
      <Route path="*" element={<Error />} />
      <Route path="/search" element={<Search signIn={signIn} signUp={signUp} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated}/>} />
      <Route path="/messages" element={<Messages signIn={signIn} signUp={signUp} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} chatWith={chatWith} />} />
      </Routes>
    </Router>
  )
}

export default App;