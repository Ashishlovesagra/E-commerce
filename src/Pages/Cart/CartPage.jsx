import React from 'react';
import './CartPage.css';
import { useAuth } from '../../ContextApi/Auth';
import { useCart } from '../../ContextApi/Cart';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const [auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();
    const navigate = useNavigate();

    //total price
    const totalPrice = () =>{
        try {
            let total = 0
            cart?.map((item)=>{
                total = total += +item.price;
            });
            return total.toLocaleString('en-IN',{
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

    //place order
    const handlePlaceOrder = () =>{
        navigate('/');
        removeCartItem();
    }
  return (
    <div className='cart-page'>
        <div className="row">
            <div className="col-md-12">
                <h1 className="text-center bg-light p-2 mb-1">
                    {`hello ${auth?.token && auth?.user?.name}`}
                </h1>
                <h4 className="text-center">
                    {cart?.length > 1 ? `You have ${cart.length} items in ypur cart ${auth?.token ? " " : " Please login to checkout"}` : "Your Cart is Empty"}
                </h4>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
            {cart?.map((p)=>(
                    <div className="row">
                    <div className="container" >
                        <div className="cart-delete-btn close" onClick={()=>removeCartItem(p._id)}>&times;</div>
                        <img className="cart-image-box" src={p.image} alt="" />
                        <div className="cart-product-name-box">{p.name}</div>
                        <div className="cart-priceBox">₹</div>
                        <div className="cart-qty-box"></div>
                        <div className="cart-perItem-priceBox">₹{p.price}</div>
                </div>
                </div>
                ))
            }
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                    <div className="coupon-mainBox">
                            <div className="coupon-inputBox">
                                <input type="text" placeholder='Voucher code' className='couponInput'/>
                            </div>
                            <div className="coupon-btn">
                                <button type="submit" className='couponBtn'>REDEEM</button>
                            </div>
                        </div>
                        <div className="user-address-box">
                            {auth?.user?.address ? (
                                <>
                                <h4>Delevery Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className='Card-update-address' onClick={()=> navigate('/dashboard/user/Profile')}>Update Adress</button>  
                                </>
                            ) : (
                                <div className="cart-login-box">
                                    {auth?.token ? (
                                        <button className="cartLogin-btn" onClick={()=>navigate('/login','/cart')}>Please Login to CheckOut</button>
                                    ) : (
                                        <button className="cartLogin-btn" onClick={()=>navigate('/login','/cart')}>Please Login to CheckOut</button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                    <div className="text-flex-box">
                            <div className="flex-box-left">Subtotal</div>
                            <div className="flex-box-right">{totalPrice()}</div>
                        </div>
                        <div className="text-flex-box">
                            <div className="flex-box-left">Shipping fee</div>
                            <div className="flex-box-right">FREE</div>
                        </div>
                        <div className="text-flex-box">
                            <div className="flex-box-left">Coupon</div>
                            <div className="flex-box-right">No</div>
                        </div>
                        <div className="text-flex-box final-Box">
                            <div className="flex-box-left final-left">TOTAL</div>
                            <div className="flex-box-right final-right">{totalPrice()}</div>
                        </div>
                        <button type="submit" onClick={handlePlaceOrder} className='payment-total-btn'>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage
