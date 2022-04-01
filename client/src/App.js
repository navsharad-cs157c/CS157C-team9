import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  let signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signin", {email: email, password: password});
      if (response.data.status == 200) {
        console.log('good status');
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    // axios.get("http://localhost:5000/user/signin").then(response => {
    //   if (response.data.status == 200) {
    //     console.log("done fetch")
    //     return true;
    //   }
    //   console.log("bad fetch")
    //   return false;
    // });
  }

  let signUp = async (email, name, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signup", {email: email, name: name, password: password});
      if (response.data.status == 200) {
        console.log('good status');
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home signIn={signIn} signUp={signUp} setisAuthenticated={setisAuthenticated}/>} />
      <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App;