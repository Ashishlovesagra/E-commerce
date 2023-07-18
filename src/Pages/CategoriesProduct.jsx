import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CategoriesProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);
  const getProductByCategory = async () => {
    try {
      const response = await axios.get(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/product-category/${params.slug}`
      );
      const data = response.data;
      setProduct(data?.products);
      setCategory(data?.catagory);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className="container"
        style={{ textAlign: "center", flexDirection: "column" }}
      >
        <h3>{category?.name}</h3>
        <h5>Total Products: {product.length}</h5>
        <div className="row">
          <div className="col-md-12 d-flex flex-wrap">
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
        </div>
      </div>
    </div>
  );
}

export default CategoriesProduct;
