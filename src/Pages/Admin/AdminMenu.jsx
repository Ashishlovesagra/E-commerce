import React from 'react';
import { Link, useParams } from 'react-router-dom';

const AdminMenu = () => {
  const param = useParams();
  return (
    <>
      <div className="text-center">
        <div className="list-group">
            <h4 style={{fontSize:"32px"}}>Admin Panel</h4>
            <Link className='list-group-item list-group-item-action' style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/create-category">Create Category</Link>
            <Link className='list-group-item list-group-item-action' style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/create-product">Create Product</Link>
            <Link className='list-group-item list-group-item-action' style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/products">Product</Link>
            <Link className='list-group-item list-group-item-action' style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/users">Users</Link>
            <Link className='list-group-item list-group-item-action' style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/orders">Orders</Link>
        </div>
      </div>
    </>
  )
}

export default AdminMenu;
