import React from 'react'
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css';
import Home from "./Components/Home/Home.js"
import SignUp from "./Components/SignUp/SignUp"
import GetOrder from "./Components/GetOrder/GetOrder"
import AddOrder from "./Components/AddOrder/AddOrder"

function App() {
  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element = {<Home />} />
        <Route path ="/SignUp" element = {<SignUp />} />
        <Route path ="/GetOrders" element = {<GetOrder />} />
        <Route path ="/AddOrder" element = {<AddOrder />} />
      </Routes>
    </BrowserRouter>
    </div>)
}

export default App;
