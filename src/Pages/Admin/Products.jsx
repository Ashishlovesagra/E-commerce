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
        <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">
            All Products
          </h1>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
          {products.map((showProduct) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/dashboard/admin/product/${showProduct.slug}`}
              key={showProduct.id}
            >
                <div class="cart m-2 border" style={{width:"18rem"}}>
                  <img
                    src={showProduct.image}
                    className="cart-img-top"
                    style={{width:"250px"}}
                    alt="Product Image"
                  />
                
                <div className="cart-body">
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
        </div>
    </>
  );
};

export default Products;
