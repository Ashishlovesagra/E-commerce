import React from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../ContextApi/Auth';

const Admindash = () => {
    const [auth] = useAuth();
  return (
    <>
     <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <div className="cart w-75 p-3">
                <h2>Name:- <span className='cart-font'>{auth?.user?.name}</span></h2>
                <h2>Email:- <span className='cart-font'>{auth?.user?.email}</span></h2>
                <h2>Phone:- <span className='cart-font'>{auth?.user?.phone}</span></h2>
                <h2>Address:- <span className='cart-font'>{auth?.user?.address}</span></h2>
            </div>
        </div>
        </div>
     </div>
    </>
  )
}

export default Admindash;
