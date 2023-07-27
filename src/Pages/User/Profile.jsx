import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../../ContextApi/Auth";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  //Context
  const [auth, setAuth] = useAuth();
  //State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  //get user data
  useEffect(() => {
    const { email, phone, name, address } = auth?.user;
    setName(name);
    setAddress(address);
    setPhone(phone);
    setEmail(email);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://e-commerce-backend-chi.vercel.app/api/v1/auth/profile",
        { name, email, phone, address, password }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="register-form" style={{ marginTop: "0px" }}>
            <h2>UPDATE PROFILE</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div className="form-group">
                <label for="phone">Phone:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group">
                <label for="address">Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                />
              </div>
              <div className="form-group">
                <button type="submit">UPDATE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;
