import React from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import useCategory from '../hook/useCategory';

function Categories() {
  const categories = useCategory();

  return (
    <div className='container categorr-main-box'>
     <h1>All Categories</h1>
     <div className="container">
      <div className="categoriesBox">
        {categories.map(c=>(
          <div className="categories-Link" key={c._id}>
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
          </div>
        ))}
      </div>
     </div>
    </div>
  )
}

export default Categories;
