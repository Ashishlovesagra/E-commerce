import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [oPrice, setOprice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");

  //Get single Product
  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/get-product/${params.slug}`
      );
      const data = response.data;
      setName(data.products[0].name);
      setId(data?.products[0]._id);
      setImage(data?.products[0].image);
      setRating(data?.products[0].rating);
      setPrice(data?.products[0].price);
      setOprice(data?.products[0].oPrice);
      setQuantity(data?.products[0].quantity);
      setShipping(data?.products[0].shipping);
      setCategory(data?.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get All Category
  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-backend-chi.vercel.app/api/v1/category/get-category"
      );
      const categoryData = response.data;
      if (categoryData?.success) {
        setCategories(categoryData?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong in getting all category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("image", image);
      productData.append("oPrice", oPrice);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("rating", rating);
      const { data } = axios.put(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.data?.success) {
        toast.error(data?.data?.message);
      } else {
        toast.success("Product Update Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  //Delete Product
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/delete-product/${id}`
      );
      toast.success("Product Deteted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="container">
        <div className="col-md-4">
          <AdminMenu />
        </div>
        <div className="col-md-6">
          <h1 style={{ textAlign: "center", fontSize: "22px" }}>
            Update Product
          </h1>
          <div className="row">
            <Select
              bordered={false}
              placeholder="Select a Category"
              size="large"
              showSearch
              className="container top-bottom"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="container top-bottom">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Name:-{" "}
              </label>
              <input
                type="text"
                value={name}
                placeholder="Write Product Name"
                className="ProductName-input"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="container top-bottom">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Image Url:-{" "}
              </label>
              <input
                type="text"
                value={image}
                placeholder="Image Url"
                className="ProductName-input"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="container top-bottom">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Price:-{" "}
              </label>
              <input
                type="text"
                value={price}
                placeholder="Write Product Price"
                className="ProductName-input"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="container top-bottom">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Original Price:-{" "}
              </label>
              <input
                type="text"
                value={oPrice}
                placeholder="Write Product Original Price"
                className="ProductName-input"
                onChange={(e) => setOprice(e.target.value)}
              />
            </div>
            <div className="container top-bottom">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Ratting Url:-{" "}
              </label>
              <input
                type="text"
                value={rating}
                placeholder="Write Product Ratting Url"
                className="ProductName-input"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="container top-bottom">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Quantity:-{" "}
              </label>
              <input
                type="text"
                value={quantity}
                placeholder="Write Product Quantity"
                className="ProductName-input"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mar-auto">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="container top-bottom">
              <button className="btn btn-success" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div>
            <div className="container top-bottom">
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
