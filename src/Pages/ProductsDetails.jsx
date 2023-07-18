import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../ContextApi/Cart";

const ProductsDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  //initals product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.products[0]);
      getSimilarProducts(data?.products[0]._id, data?.products[0].catagory);
    } catch (error) {
      console.log(error);
    }
  };
  //get Similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.product);
      console.log(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-5">
          <img
            src={product.image}
            style={{ width: "80%", marginLeft: "10%" }}
            alt="Product Image"
          />
        </div>
        <div className="col-md-5">
          <h1>{product.name}</h1>
          <div className="container">
            <p className="productRatingTitle">Rating:</p>
            <img src={product.rating} alt="rating" style={{ width: "220px" }} />
          </div>
          <div className="row">
            <p>
              Offer Price:{" "}
              <span className="productPriceTitle"> ₹ {product.price}/-</span>
            </p>
          </div>
          <div className="row">
            <p>
              Original Price:{" "}
              <span className="productOPriceTitle"> ₹ {product.oPrice}/-</span>
            </p>
          </div>
          <div className="row">
            <p>
              Quantity:{" "}
              <span className="productRatingTitle"> {product.quantity}</span>
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to Cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="similarTitleBox">Similar Products</div>
      <div className="container">
        {relatedProduct.map((prod) => (
          <div
            className="ProductCart"
            key={prod._id}
            onClick={() => navigate(`/product/${prod.slug}`)}
          >
            <img className="ProductImage" src={prod.image} alt="" />
            <p className="ProductName">{prod.name}</p>
            <img src={prod.rating} alt="" className="ProductRating" />
            <div className="productPriceBox">
              <p className="ProductPrice">₹{prod.price}</p>
              <p className="ProductOprice">₹{prod.oPrice}</p>
            </div>
            <button
              className="ProductBtn"
              onClick={() => {
                setCart([...cart, prod]);
                localStorage.setItem("cart", JSON.stringify([...cart, prod]));
                toast.success("Item Added to Cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsDetails;
