import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
            <h4 style={{fontSize:"32px"}}>User Panel</h4>
            <Link className='list-group-item list-group-item-action' style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/user/Profile">Profile</Link>
            <Link className='list-group-item list-group-item-action' style={{fontSize:"25px",textDecoration:"none"}}  to="/dashboard/user/orders">Orders</Link>
        </div>
      </div>
    </>
  )
}

export default UserMenu;
