import React from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../ContextApi/Auth';

const Admindash = () => {
    const [auth] = useAuth();
  return (
    <>
     <div className="container">
        <div className="col-md-4">
            <AdminMenu/>
        </div>
        <div className="col-md-6">
            <div className="container d-flex flex-column">
                <h2>Name:- <span className='cart-font'>{auth?.user?.name}</span></h2>
                <h2>Email:- <span className='cart-font'>{auth?.user?.email}</span></h2>
                <h2>Phone:- <span className='cart-font'>{auth?.user?.phone}</span></h2>
                <h2>Address:- <span className='cart-font'>{auth?.user?.address}</span></h2>
            </div>
        </div>
     </div>
    </>
  )
}

export default Admindash;
