import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';

const App = () => {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App;