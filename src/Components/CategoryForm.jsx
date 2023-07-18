import React from 'react';

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <form className='d-flex' onSubmit={handleSubmit}>
        <div className="categoryForm-Box">
            <input type="text" className='form-control' placeholder='Enter New Category' value={value} onChange={(e)=>setValue(e.target.value)}/>
        </div>
        <button type='submit' className='CategoryForm-btn'>Submit</button>
      </form>
    </>
  )
}

export default CategoryForm;
