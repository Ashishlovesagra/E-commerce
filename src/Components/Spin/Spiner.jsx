import React, { useEffect, useState } from "react";
import "./Style.css";
import { useLocation, useNavigate } from "react-router-dom";

function Spiner({path="login"}) {
  const [count,setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount((prevValue) => --prevValue);
    },1000);
    count === 0 && navigate(`/${path}`,{
      state: location.pathname
    });
    return () => clearInterval(interval)
  },[count,navigate,location,path])
  return (
    <>
      <div className="spinner"></div>
      <div className="text">Redirecting to you in {count} seconds</div>
    </>
  );
}

export default Spiner;
