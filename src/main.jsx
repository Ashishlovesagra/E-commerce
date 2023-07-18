import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./ContextApi/Auth.jsx";
import 'antd/dist/reset.css';
import { SearchProvider } from "./ContextApi/Search.jsx";
import { CartProvider } from "./ContextApi/Cart.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <ToastContainer />
          <App />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>,
)
