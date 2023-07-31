import React, { useEffect, useState } from 'react';
import './CartPage.css';
import { useAuth } from '../../ContextApi/Auth';
import { useCart } from '../../ContextApi/Cart';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from "react-toastify";

function CartPage() {
    const [auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();
    const [clientToken,setClientToken] = useState("");
    const [amount,setAmount] = useState(1);
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () =>{
        try {
            let total = 0
            let sum = 0
            cart?.map((item)=>{
                total = total += +item.price;
                sum = total * amount;
            });
            return sum.toLocaleString('en-IN',{
                style:"currency",
                currency: "INR"
            });
        } catch (error) {
            console.log(error)
        }
    }

    //delete cart item
    const removeCartItem = (pid) =>{
        try {
            let myCart = [...cart]
            let index = myCart.findIndex((item)=>item._id === pid);
            myCart.splice(index,1);
            setCart(myCart);
            localStorage.setItem('cart',JSON.stringify(myCart));
        } catch (error) {
            console.log(error)
        }
    }
    //quantity management
    const setDecrement = () => {
        amount > 1 ? setAmount(amount - 1) : setAmount(1);
    };

    const setIncrement = () => {
        amount < 10 ? setAmount(amount + 1) : setAmount(10);
    };

    
    //get payment gateway token
    const getToken = async () => {
        try {
            const {data} = await axios.get("https://e-commerce-backend-chi.vercel.app/api/v1/products/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getToken();
    },[auth?.token])

    //place order
    const handlePlaceOrder = () =>{
        navigate('/');
        removeCartItem();
    }
    //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("https://e-commerce-backend-chi.vercel.app/api/v1/products/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
        <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row " style={{width:"90%"}}>
            <div className="col-md-6  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" style={{margin:"10px"}} key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={p.image}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                    <button onClick={() => setDecrement(p._id)}>-</button>
                    <span>{amount}</span>
                    <button onClick={() => setIncrement(p._id)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage
