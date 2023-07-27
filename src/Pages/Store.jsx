import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../ContextApi/Cart";
import { toast } from "react-toastify";
import { prices } from "./../Utilies/Prices";

function Store() {
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
      <div className="row" >
        <div className="col-md-3">
          <h1 className="text-center mt-5">Filter By Category</h1>
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
          <h3 className="text-center mt-4">Filter By Prices</h3>
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
    </>
  );
}

export default Store;
