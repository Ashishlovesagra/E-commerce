import React from "react";
import { useSearch } from "../ContextApi/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import SearchIcon from "../Assets/SearchIcon.svg";

const SearchInput = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://e-commerce-backend-chi.vercel.app/api/v1/products/search/${value.keyword}`
      );
      setValue({ ...value, result: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSumbit}>
        <input
          className="form-control me-2 nav-search-box"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value.keyword}
          onChange={(e) => setValue({ ...value, keyword: e.target.value })}
        />
        <button className="btn nav-search-btn" type="submit">
          <img src={SearchIcon} className="nav-search-img" alt="search" />
        </button>
      </form>
    </>
  );
};

export default SearchInput;
