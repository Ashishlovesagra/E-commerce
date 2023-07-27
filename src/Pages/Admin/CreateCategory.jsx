import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import "./Style.css";
import { Modal } from "antd";
import CategoryForm from "./../../Components/CategoryForm";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://e-commerce-backend-chi.vercel.app/api/v1/category/create-category",
        { name }
      );
      if (data?.data?.success) {
        toast.success(`${name} is Created`);
        getAllCategory();
      } else {
        toast.error(data.messsage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Input Form");
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
      toast.error("Something went Wrong in getting all category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(selected);
    try {
      const data = await axios.put(
        `https://e-commerce-backend-chi.vercel.app/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.data.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.data.messsage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong in Update category Name");
    }
  };

  //Delete Category
  const handleDelete = async (pId) => {
    try {
      const data = await axios.delete(
        `https://e-commerce-backend-chi.vercel.app/api/v1/category/delete-category/${pId}`
      );
      if (data.data.success) {
        toast.success(`Category is Deleted`);
        getAllCategory();
      } else {
        toast.error(data.data.messsage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong in Update category Name");
    }
  };
  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="w-75">
          <h1 style={{fontSize: "36px" }}>
            Manage category
          </h1>
          <div className="container w-75">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td style={{ display: "flex" }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setOpen(true);
                          setUpdatedName(item.name);
                          setSelected(item);
                        }}
                        style={{
                          fontSize: "18px",
                          padding: "0px",
                          margin: "5px",
                          height: "32px",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                        style={{
                          fontSize: "18px",
                          padding: "0px",
                          margin: "5px",
                          height: "32px",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
