import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [oPrice, setOprice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [catagory, setCatagory] = useState("");

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

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("image", image);
      productData.append("oPrice", oPrice);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("catagory", catagory);
      productData.append("rating", rating);
      const { data } = axios.post(
        "https://e-commerce-backend-chi.vercel.app/api/v1/products/create-product",
        productData
      );
      if (data?.data?.success) {
        toast.error(data?.data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 text-center">
          <div className="m-1 w-75">
          <h1 style={{ fontSize: "32px" }}>
            Create Product
          </h1>
            <Select
              bordered={false}
              placeholder="Select a Category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCatagory(value);
              }}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Name:-{" "}
              </label>
              <input
                type="text"
                value={name}
                placeholder="Write Product Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Image Url:-{" "}
              </label>
              <input
                type="text"
                value={image}
                placeholder="Image Url"
                className="form-control"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Price:-{" "}
              </label>
              <input
                type="text"
                value={price}
                placeholder="Write Product Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Original Price:-{" "}
              </label>
              <input
                type="text"
                value={oPrice}
                placeholder="Write Product Original Price"
                className="form-control"
                onChange={(e) => setOprice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Ratting Url:-{" "}
              </label>
              <input
                type="text"
                value={rating}
                placeholder="Write Product Ratting Url"
                className="form-control"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" style={{ fontSize: "18px" }}>
                Product Quantity:-{" "}
              </label>
              <input
                type="text"
                value={quantity}
                placeholder="Write Product Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-success" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
