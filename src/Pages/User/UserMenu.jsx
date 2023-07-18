import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <>
      <div className="container">
        <div className="list-group">
            <h4 style={{textAlign:"center"}}>User Panel</h4>
            <Link style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/user/Profile">Profile</Link>
            <Link style={{fontSize:"25px",textDecoration:"none"}}  to="/dashboard/user/orders">Orders</Link>
        </div>
      </div>
    </>
  )
}

export default UserMenu;
