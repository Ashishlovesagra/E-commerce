import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
// import Accessories from "../Pages/Accessories/Accessories";
// import Home from "../Pages/Home/Home";
// import Ipad from "../Pages/Ipad/Ipad";
// import Iphone from "../Pages/Iphone/Iphone";
// import Mackbook from "../Pages/Mackbook/Mackbook";
// import Store from "../Pages/Store/Store";
// import PageNotFound from "./PageNotFound";
// import Register from "../Components/AuthPages/Register";
// import Login from "../Components/AuthPages/Login";
// import Dashboard from "../Pages/User/Dashboard";
// import PrivateRoute from "../Components/PrivateRoute/Private";
// import ForgotPassword from "../Components/AuthPages/ForgotPassword";
// import Admindash from "../Pages/Admin/Admindash";
// import AdminRoute from "../Components/PrivateRoute/AdimnRoute";
// import CreateCategory from "../Pages/Admin/CreateCategory";
// import CreateProduct from "../Pages/Admin/CreateProduct";
// import Users from "../Pages/Admin/Users";
// import Profile from "../Pages/User/Profile";
// import Orders from "../Pages/User/Orders";
// import Products from "../Pages/Admin/Products";
// import UpdateProduct from "../Pages/Admin/UpdateProduct";
// import Search from "../Pages/Search/Search";
// import ProductsDetails from "../Pages/ProductsDetails/ProductsDetails";
// import Categories from "../Pages/Categories/Categories";
// import CategoriesProduct from "../Pages/CategoriesProduct/CategoriesProduct";
// import CartPage from "../Pages/Cart/CartPage";
import Register from './../AuthPages/Register';
import Login from './../AuthPages/Login';
import ForgotPassword from './../AuthPages/ForgotPassword';
import Store from "../Pages/Store";
import Navbar from "../Components/Navbar";
import ProductsDetails from "../Pages/ProductsDetails";
import CategoriesProduct from "../Pages/CategoriesProduct";
import Categories from "../Pages/categories";
import CartPage from './../Pages/Cart/CartPage';
import Search from "../Pages/Search";
import PrivateRoute from './../Components/PrivateRoute/Private';
import Dashboard from './../Pages/User/Dashboard';
import Profile from './../Pages/User/Profile';
import Orders from './../Pages/User/Orders';
import AdminRoute from './../Components/PrivateRoute/AdimnRoute';
import Admindash from './../Pages/Admin/Admindash';
import CreateCategory from './../Pages/Admin/CreateCategory';
import CreateProduct from './../Pages/Admin/CreateProduct';
import UpdateProduct from './../Pages/Admin/UpdateProduct';
import Products from './../Pages/Admin/Products';
import Users from './../Pages/Admin/Users';
import PageNotFound from "./PageNotFound";
import Footer from "../Components/Footer";

function Rout() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/store" element={<Store/>} />
          <Route path="/product/:slug" element={<ProductsDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoriesProduct />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Admindash />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default Rout;
