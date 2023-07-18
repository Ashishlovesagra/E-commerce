import React from 'react';
import { useSearch } from '../ContextApi/Search';

function Search() {
    const [value,setValue] = useSearch();
  return (
    <>
      <div className="row">
        <div className="text-center">
            <h2>Search Results</h2>
            <h5>{value?.result.length < 1 ? "No Products Found" : `Found ${value.result.length}`}</h5>
        </div>
        <div className="container">
        <div className="col-md-12 d-flex flex-wrap" style={{justifyContent:"center"}}>
            {value.result.map((prod) => (
              <div className="ProductCart" key={prod._id}>
              <img className='ProductImage' src={prod.image} alt="" />
              <p className="ProductName">{prod.name}</p>
              <img src={prod.rating} alt="" className="ProductRating" />
              <div className="productPriceBox">
              <p className="ProductPrice">₹{prod.price}</p>
              <p className="ProductOprice">₹{prod.oPrice}</p>
              </div>
                <button className="ProductBtn">Add to Cart</button>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search;
