import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import PrivateEvents from './pages/PrivateEvents';
import PrivateRoutes from './utils/PrivateRoutes';



function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/privateEvents" element={<PrivateEvents />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
