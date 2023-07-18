import { useState, useEffect } from "react";
import { useAuth } from "../../ContextApi/Auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spiner from "../Spin/Spiner";

export default function AdminRoute() {
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://127.0.0.1:1009/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spiner path="" />;
}
