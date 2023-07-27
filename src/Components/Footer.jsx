import React from 'react';

function Footer() {
  return (
    <>
      <div className="container" >
      <div className="container box" style={{justifyContent:"center"}}>
      <div className="containerH1">
        <div className="h1-textBox" style={{textAlign:"left",color:"GrayText",fontWeight:"100",fontSize:"24px"}}>ISHOP</div>
        <div className="h1-paraBox" style={{fontSize:"12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</div>
      </div>
      <div className="containerH1">
        <div className="h1-textBox" style={{textAlign:"left",fontWeight:"100",fontSize:"24px"}}>Follow Us</div>
        <div className="h1-paraBox" style={{fontSize:"12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</div>
      </div>
      <div className="containerH1">
        <div className="h1-textBox" style={{textAlign:"left",fontWeight:"100",fontSize:"24px"}}>Contact Us</div>
        <div className="h1-paraBox" style={{fontSize:"12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</div>
      </div>
     </div>
     </div>
     <div className="text-center" style={{width:"100%",backgroundColor:"black",color:"whitesmoke"}}>
        <div className="row">
            <div className="col-md-12 p-3 ">
              <h1>All Right Reserved @ Ashish Singh</h1>
              <h5> <a href="https://ashish-profile.netlify.app/" style={{textDecoration:"none"}}>About</a> Developer </h5>
              </div>
        </div>
     </div>
    </>
  )
}

export default Footer;
