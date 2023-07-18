import React from "react";
import "./Style.css";
import ProfileIcon from "../Assets/ProfileIcon.svg";
import BagIcon from "../Assets/BagIcon.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../ContextApi/Auth";
import { toast } from "react-toastify";
import { useCart } from "../ContextApi/Cart";
import SearchInput from "../Utilies/SearchInput";
import useCategory from "./../hook/useCategory";

function Navbar() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: " ",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="nav-div1">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ border: "none" }}
            >
              INR
            </button>
          </div>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ border: "none" }}
            >
              ₹
            </button>
          </div>
        </div>
        <div className="nav-div2">
          <div className="nav-div3">
            {!auth.user ? (
              <>
                <Link
                  to="/login"
                  className="nav-div3"
                  style={{ textDecoration: "none" }}
                >
                  <div className="nav-profile-svg">
                    <img
                      src={ProfileIcon}
                      style={{ width: "16px", height: "16px" }}
                      alt="User Profile"
                    />
                  </div>
                  <div className="nav-profile-text">Login</div>
                </Link>
              </>
            ) : (
              <>
                <ul>
                  <div class="dropdown nav-div3">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ border: "none" }}
                    >
                      <Link className="draplink">{auth?.user?.name}</Link>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/login"
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </ul>
              </>
            )}
          </div>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div className="nav-div4">
              <div className="nav-profile-svg">
                <img
                  src={BagIcon}
                  alt=""
                  style={{ width: "16px", height: "16px" }}
                />
              </div>
              <div className="nav-profile-text">{cart?.length} Item</div>
            </div>
          </Link>
          <div className="nav-div5">
            <SearchInput />
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span className="nav-title-1">i</span>
            <span className="nav-title-2">SHOP</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/store" className="nav-link">
                  Store
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="/iphone">
                  Iphone
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="/ipad">
                  Ipad
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="/mackbook">
                  Mackbook
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      All Category
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li>
                      <Link className="dropdown-item" key={c._id} style={{textDecoration:"none"}} to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
