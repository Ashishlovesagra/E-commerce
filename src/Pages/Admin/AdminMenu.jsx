import React from 'react';
import { Link, useParams } from 'react-router-dom';

const AdminMenu = () => {
  const param = useParams();
  return (
    <>
      <div className="text-center">
        <div className="list-group">
            <h4>Admin Panel</h4>
            <Link style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/create-category">Create Category</Link>
            <Link style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/create-product">Create Product</Link>
            <Link style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/products">Product</Link>
            <Link style={{fontSize:"25px",textDecoration:"none"}} to="/dashboard/admin/users">Users</Link>
        </div>
      </div>
    </>
  )
}

export default AdminMenu;
