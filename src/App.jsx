import React from 'react'
import { BrowserRouter as Router,  Route,  Routes, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/DashBoard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Payment from './pages/order/Payment';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order/>
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard/>
            </ProtectedRouteForAdmin>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductInfo />} />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct" element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/success" element={<Payment status="success" />} />
          <Route path="/cancel" element={<Payment status="failure" />} />
          <Route path="/*" element={<NoPage/>} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App

const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem("user");
  if(!user){
    return <Navigate to="/login" />
  }
  return children;
}

const ProtectedRouteForAdmin = ({children}) => {
  const user = JSON.parse(localStorage.getItem("user"));
    if(user?.user.email !== "kumar@gmail.com"){
      return <Navigate to="/login" />
    }
    return children;
}