import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHouse, faFacebook } from '@fortawesome/free-solid-svg-icons'

import Sell from './comps/seller';
import AboutUs from './comps/Aboutus'
import Services from './comps/Services'
import Homepage from './comps/Homepage'
import PageNotFound from './comps/NotFound';
import BuyerData from './comps/buyer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>

      <nav class="navbar navbar-expand-sm navbar-dark bg-dark" id="topNavBar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><FontAwesomeIcon icon={faHouse} /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav me-auto">
              <li class="nav-item"><Link class="nav-link" to="/" >Home</Link></li>
              <li class="nav-item"><Link class="nav-link" to="/aboutus" >About Us</Link></li>
              <li class="nav-item"><Link class="nav-link" to="/buyer" >Add A Buyer</Link></li>
              <li class="nav-item"><Link class="nav-link" to="/seller" >Add A Seller</Link></li>

            </ul>
{/*             
              <button  type="button" class="btn btn-dark" id="searchBut">Login</button> */}
              <ul class="socials">
                {/* <li><FontAwesomeIcon icon={faFacebook} /></li> */}
              </ul>
            
          </div>
        </div>
      </nav>







      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/buyer" element={<BuyerData />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/seller" element={<Sell />} />
      </Routes></BrowserRouter>



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
