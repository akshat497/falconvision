import {  useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import RestaurantContext from "../../context/RestaurantContext";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const FilterModal = ({ visible, onClose, onApplyFilter }) => {

  const category = useSelector((state) => state.fetchcategory.fetchedcategory);
  const allItems = useSelector((state) => state.fetchitem.f_item);
  const { fetcheditems, setFetcheditems,fetcheditemsCopy, setFetcheditemsCopy } = useContext(RestaurantContext);
  const [rangeValue, setRangeValue] = useState([20, 800]);
  const [categoryName, setcategoryName] = useState("");
  const [type, settype] = useState("Both");
  const [range, setRange] = useState([20, 80]);

  const handleSliderChange = (newRange) => {
    setRange(newRange);
    setRangeValue(newRange);
  };
  const handleRangeChange = (event) => {
    
    const newValue = event.target.value;
    setRangeValue(newValue);
  };
  const handleApplyFilter = () => {
    
    const minPrice =  Number(rangeValue[0]); // Set your desired minimum price
    const maxPrice = Number(rangeValue[1]); // Set your desired maximum price
  
    const filteredData = allItems?.filter((data) => {
      const isCategoryMatch = categoryName==="all"?data: data?.Category?.name===categoryName;
      const isPriceInRange = data?.price >= minPrice && data?.price <= maxPrice;
      const isType=type==="Both"?data:data?.veg===type
    

      return isCategoryMatch && isPriceInRange &&isType;
    });
    filteredData?.sort((a,b)=>{
        return a?.price - b?.price
      })
      setFetcheditemsCopy(filteredData);
      // onClose();
  }
  
  
  const handleCategoryFilter = (e) => {
    ;
    const categoryname = e.target.value;
    // setCategoryId(categoryId);
    setcategoryName(categoryname)
  };
  const handleTypeFilter=(e)=>{
    const type=e.target.value;
    if(type==="veg"){
      settype(true)
    }else if(type==="Both"){
      settype("Both")
    } else{
      settype(false)
    }
   
  }
  useEffect(()=>{setcategoryName("all") ; settype("Both")},[])


  const resetFunction=()=>{
    setcategoryName("all");
    setRangeValue([20, 800]);
    // setcategoryName(false);
    setFetcheditemsCopy(fetcheditems)
  }
  return (
 
   <>
    <div
      className="modal "
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Filter Options
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
             
            />
          </div>
          <div className="modal-body">
  <div className="mb-4">
    <label htmlFor="categorySelect" className="form-label">Filter by Category:</label>
    <select id="categorySelect" className="form-select" onChange={handleCategoryFilter} value={categoryName}>
      <option value="all">All</option>
      {category?.map((data) => (
        <option key={data?.categoryId} value={data?.name}>
          {data?.name}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-4">
  <label htmlFor="typeSelect" className="form-label">Filter by type:</label>
    <select id="typeSelect" className="form-select" onChange={handleTypeFilter} >
      <option >Both</option>
      <option >veg</option>
      <option >Non Veg</option>
    </select>
  </div>
  <div>
    <label htmlFor="priceRange" className="form-label">Filter by Price:</label>
    <div className="">
    <div>
    
    <div>
        <span > {rangeValue[0]}</span>
        
        <span  style={{marginLeft:"75%"}}> {rangeValue[1]}</span>
      </div>
      <Slider
        min={20}
        max={1000}
        range
        value={rangeValue}
        onChange={handleSliderChange}
      />
     
    
     
    </div>
      {/* <span><b>0</b></span>
      <input
        type="range"
        id="priceRange"
        className="form-range"
        min="20"
        max="1000"
        value={rangeValue}
        onChange={handleRangeChange}
      />
      <span className="ms-3"><b>{rangeValue}</b></span> */}
    </div>
    
  </div>

</div>


          <div className="modal-footer">
          <div className="">
    <button
      className="btn btn-secondary"
      onClick={() => {
        resetFunction()
      }}
    >
      Reset
    </button>
  </div>
            <button
              type="button"
              className="btn text-light"
              style={{backgroundColor:"purple"}}
              onClick={handleApplyFilter}
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Apply 
            </button>
          </div>
        </div>
      </div>
    </div>
   </>

 

   
  );
};

export default FilterModal;