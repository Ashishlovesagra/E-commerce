import { useState, useEffect } from "react";
import { useAuth } from "../../ContextApi/Auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spiner from "../Spin/Spiner";

export default function PrivateRoute() {
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("https://e-commerce-backend-chi.vercel.app/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spiner />;
}
