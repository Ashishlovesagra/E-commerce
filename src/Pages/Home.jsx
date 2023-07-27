import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../ContextApi/Cart";
import { toast } from "react-toastify";
import { prices } from "./../Utilies/Prices";
import Carousel from "react-bootstrap/Carousel";
import "./Style.css";
import Image1 from "../Assets/Image1.png";
import Image2 from "../Assets/Image2.png";
import Image3 from "../Assets/Image3.png";
import Support from "../Assets/Support.png";
import Refund from "../Assets/Refund.png";
import Shipping from "../Assets/Shipping.png";

import ImageSlider from "../Components/ImageSlider/ImageSlider";

function Home() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://e-commerce-backend-chi.vercel.app/api/v1/products/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //get All Category
  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-backend-chi.vercel.app/api/v1/category/get-category"
      );
      const categoryData = response.data;
      if (categoryData.success) {
        setCategory(categoryData.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //Get Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProduct(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //Filter by Category
  const handleFilter = (value, id) => {
    if (value) {
      setChecked((prevChecked) => prevChecked.concat(id));
    } else {
      setChecked((prevChecked) => prevChecked.filter((c) => c !== id));
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  //get filters products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        "https://e-commerce-backend-chi.vercel.app/api/v1/products/product-filters",
        { checked, radio }
      );
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="home-page">
      <div className="row" style={{width:"100%"}}>
      <div className="homeImageSlider">
        <ImageSlider images={[Image1, Image2, Image3]} />
      </div>
      </div>
      <div className="row" style={{width:"100%"}}>
        <div className="col-md-3">
          <h3 className="text-center mt-5">Filter By Category</h3>
          <div className="d-flex flex-column">
            <div className="row" style={{marginLeft:"10%"}}>
            {category?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                <span className="productCategoryName">{c.name}</span>
              </Checkbox>
            ))}
            </div>
          </div>
          <h3 className="text-center mt-4">Filter By Price</h3>
          <div className="d-flex flex-column">
            <div className="row" style={{marginLeft:"10%"}}>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            </div>
          </div>
          <button
            className="btn btn-primary mt-4"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap" style={{justifyContent:"center"}}>
          {product.map((prod) => (
              <div className="ProductCart" key={prod._id}>
                <img
                  className="ProductImage"
                  onClick={() => navigate(`/product/${prod.slug}`)}
                  src={prod.image}
                  alt=""
                />
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
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, prod])
                    );
                    toast.success("Item Added to Cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="row mt-4" style={{width:"100%"}}>
          {product && product.length < total && (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="row d-flex border home-custom1" style={{width:"100%",height:"600px",marginTop:"140px"}}>
        <div className="home-div1 box">
        <div className="home-div2">
          <h1>iPhone 6 Plus</h1>
          <h2>Performance and design. Taken right to the edge.</h2>
          <Link className="home-LinkTag">SHOP NOW</Link>
        </div>
        <div className="home-div3">
          <img src={Image2} className="home-img-extra" alt="image" />
        </div>
        </div>
      </div>
    </div>
      
    </>
  );
}

export default Home;
