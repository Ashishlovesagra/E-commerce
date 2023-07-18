import React from 'react';
import AdminMenu from './AdminMenu';

const Users = () => {
  return (
    <>
      <div className="container">
        <div className="col-md-4">
            <AdminMenu/>
        </div>
        <div className="col-md-6">
        <h1>All Users</h1>
        </div>
    </div>
    </>
  )
}

export default Users;
