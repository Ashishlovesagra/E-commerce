import React from 'react'
import UserMenu from './UserMenu';

const Orders = () => {
  return (
    <>
      <div className="container">
        <div className="col-md-4">
            <UserMenu/>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6" >
        <h1 style={{margin:"0"}}>All Orders</h1>
        </div>
    </div>
    </>
  )
}

export default Orders;
