import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Style.css";
import AdminMenu from "./AdminMenu";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProduct] = useState([]);

  //get all product
  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-backend-chi.vercel.app/api/v1/products/get-product"
      );
      const data = response.data;
      setProduct(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in get All Product");
    }
  };
  //lifecycle method
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
      <div className="container">
        <div className="col-md-4">
          <AdminMenu />
        </div>
        <div className="col-md-6">
          <h1 style={{ textAlign: "center", fontSize: "22px" }}>
            All Products
          </h1>
          {products.map((showProduct) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/dashboard/admin/product/${showProduct.slug}`}
              key={showProduct.id}
            >
              <div class="row d-flex border m-1">
                <div style={{ width: "180px" }}>
                  <img
                    src={showProduct.image}
                    style={{ width: "180px" }}
                    alt="Product Image"
                  />
                </div>
                <div style={{ width: "450px" }}>
                  <h3 class="cartItem-name">{showProduct.name}</h3>
                  <div class="cartItem-rating">
                    <img
                      style={{ width: "200px", height: "75px" }}
                      src={showProduct.rating}
                      alt="Rating"
                    />
                  </div>
                  <div class="cartItem-rating">
                    <span class="cartItem-offerPrice">
                      ₹{showProduct.oPrice}
                    </span>
                    <span class="cartItem-price">₹{showProduct.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
