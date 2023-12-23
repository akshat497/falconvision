import React, { useContext, useEffect, useRef, useState } from "react";

import "../../style/adminstyle.css";
import { FaArrowLeft, FaArrowRight, FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
 
  updateItem,
} from "../../../redux/items/itemThunk";
import RestaurantContext from "../../../context/RestaurantContext";
import { toast } from "react-toastify";

export default function AddItem({ preview, clickedItem }) {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { expanded } = useContext(RestaurantContext);
  // (clickedItem);
  // const {restroDetails}=useContext(RestaurantContext)
  const restroDetails = useSelector((state) => state.restrodetail.restro);

  const loading = useSelector((state) => state.addItem.itemloading);
  const updateLoading=useSelector((state)=>state.updateitem.u_Itemloading)
  const fullFilled = useSelector(
    (state) => state.fetchcategory.fetchedcategory
  );
  const [itemData, setItemData] = useState({
    name: "",
    price: "",
    veg: "", // Default to 'Veg'
    dishType: "BreakFast", // Default to 'Breakfast'
  });
  const [FetchedCategories, setFetchedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [base64Image, setbase64Image] = useState(
    "https://img.freepik.com/free-vector/plate-with-cutlery_23-2147504597.jpg?size=626&ext=jpg&ga=GA1.2.480076137.1690472873&semt=ais"
  );
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [0, 1, 2];

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     
    if (!itemData.name) {
      setValidationErrors({ ...validationErrors, name: "Name is required" });
      toast.error("Name is required");
      return;
    }

    if (!itemData.price) {
      setValidationErrors({ ...validationErrors, price: "Price is required" });
      toast.error("Price is required");
      return;
    }
    if(!selectedCategory){
      setValidationErrors({ ...validationErrors, category: "category is required" });
      toast.error("category is required");
      return;
    }
    if(!itemData.veg){
      setValidationErrors({ ...validationErrors, type: "type is required" });
      toast.error("type is required");
      return;
    }
    if(!base64Image){
      setValidationErrors({ ...validationErrors, image: "image is required" });
      toast.error("image is required");
      return;
    }
    if (preview === "preview") {
      // (clickedItem)
      const body = {
        name: itemData.name,
        price:itemData.price,
        userId: restroDetails?.userId,
        categoryId: selectedCategory,
        menuItemId: clickedItem.menuItemId,
        imageUrl: base64Image,
        veg: itemData?.veg=== "veg"||itemData?.veg=== "Veg"?true:false ,
        type: itemData?.type,
        // price:Number(itemData.price),
        // imageUrl:base64Image
      };

      dispatch(updateItem(body));
    }
    if (
      preview === "" ||
      !preview ||
      preview === null ||
      preview === undefined
    ) {
      const body = {
        name: itemData.name,
        userId: restroDetails?.userId,
        categoryId: selectedCategory,
        price: Number(itemData.price),
        imageUrl: base64Image,
        veg: itemData?.veg === "veg" ? true : false,
        type: itemData?.dishType,
      };

      dispatch(addItem(body));
    }
    resetForm();
    // setItemData({
    //   name: "",
    //   price: "",
    //   dishType: "",
    //   veg: "",
    // });
    // setbase64Image("")
    // setCategory("")
  };
  const resetForm = () => {
    setItemData({
      name: "",
      price: "",
      dishType: "",
      veg: "",
    });
  
    setbase64Image("");
    setSelectedCategory("");
    setValidationErrors({});
  };

  useEffect(() => {
    
    if (preview) {
      setItemData({
        name: clickedItem?.name,
        price: clickedItem?.price,
        dishType: clickedItem?.type,
        veg: clickedItem?.veg ? "Veg" : "Non-Veg",

      });
      // (itemData)
    }
    setSelectedCategory(clickedItem?.Category?.categoryId);
    setbase64Image(clickedItem?.imageUrl);
  }, [clickedItem]);
  const convertimage = (e) => {
    ;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result;
      // Now, `base64String` contains the base64 encoded image data
      // (base64String);
      setbase64Image(base64String);
    };

    reader.readAsDataURL(file);
  };
  // useEffect(() => {

  //    if(restroDetails!==null){
  //     dispatch(fetchCategory(restroDetails?.userId));
  //    }
  //   }, [restroDetails]);
  // useEffect(() => {
  //   
  //   dispatch(fetchCategory(clickedItem?.userId));
  // }, [clickedItem]);

  useEffect(() => {
    if (fullFilled !== null) {
      setFetchedCategories(fullFilled);
    }
  }, [fullFilled]);

  const handleCategoryChange = (e) => {
    
    const selectedCategoryId = e.target.value;
    // (selectedCategoryId)
    setSelectedCategory(selectedCategoryId);
  };

  //   (fullFilled)
  return (
    <>
      {/* {preview === "preview" ? "" : <Header />} */}
      {loading ? <div className="overlay"></div> : null}
      <section
        className={
          preview === "preview"
            ? ""
            : expanded
            ? " "
            : ""
        }
      >
        <div
          className={preview ? "add-item-container" : "add-item-container"}
         
        >
         
          <form onSubmit={handleSubmit}>
            {/* Render the form fields based on the current step */}

            {currentStep === 0 && (
              <>
              <h2>{preview === "preview" ? "Update Item" : "Add Item"}</h2>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={itemData?.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={itemData?.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
               
              </>
            )}
            {currentStep===1&&(
              <>
              <div className="form-group">
                  <label htmlFor="category">Upload Image:</label>
                  <div style={{ display: "flex" }}>
                    <div
                      onClick={() => {
                        fileRef.current.click();
                      }}
                      className="btn fs-2 my-2 me-5"
                    >
                      <FaUpload />
                    </div>
                  <div  className="mt-2" style={{marginLeft:"50%"}}>
                  <img
                      src={preview ? clickedItem?.imageUrl : base64Image}
                      alt="..."
                      style={{ borderRadius: "60px" }}
                      height={70}
                      width={70}
                      className="mb-2 ms-5"
                    />
                  </div>
                  </div>
                  <input
                    type="file"
                    ref={fileRef}
                    className="d-none"
                    onChange={convertimage}
                  />
                   <label htmlFor="category">Category:</label>
                  <select
                    id="category"
                    name="category"
                    onChange={handleCategoryChange}
                  >
                    <option value={""}>
                      {preview
                        ? clickedItem?.Category?.name
                        : "Select a Category"}
                    </option>
                    {FetchedCategories.map((category) => (
                      <option
                        key={category?.categoryId}
                        value={category?.categoryId}
                        disabled={!category?.isActive}
                        style={category?.isActive ? null : { opacity: "0.5" }}
                      >
                        {category?.isActive
                          ? category?.name
                          : category?.name + "      (disabled)"}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="form-group">
                 
                  <label htmlFor="veg">Veg/Non-Veg:</label>
                  <select id="veg" name="veg" onChange={handleInputChange}>
                    <option value={""}>
                      {preview
                        ? clickedItem?.veg
                          ? "veg"
                          : "non veg"
                        : "Select a veg/nonveg"}
                    </option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dishType">Type of Dish:</label>
                  <select
                    id="dishType"
                    name="dishType"
                    onChange={handleInputChange}
                  >
                    <option value={""}>
                      {preview ? clickedItem?.type : "Select Dish Type"}
                    </option>
                    <option value="BreakFast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </>
            )}
            {/* <button
              type="submit"
              className="btn btn-primary"
              // disabled={
              //   loading ||
              //   itemData.name.trim() === '' ||
              //   selectedCategory.trim() === ''
              // }
            >
              {preview === "preview"
                ? loading
                  ? " Updating Item..."
                  : " Update Item"
                : loading
                ? " Adding Item..."
                : " Add Item"}
            </button> */}
            <div className="bottom-buttons mx-3 mb-2">
  {currentStep >= 0 && (
    <button
      type="button"
      className=" btn-back"
      onClick={goToPreviousStep}
      disabled={currentStep===0}
    >
      <FaArrowLeft/>
    </button>
  )}
  {currentStep < steps.length - 1 && (
    <button
      type="button"
      className="btn "
      onClick={goToNextStep}
    >
     <FaArrowRight/>
    </button>
  )}
  {currentStep === steps.length - 1 && (
    <button
  type=""
  className="btn"
  style={{ backgroundColor: "purple" }}
  disabled={
    itemData.name.trim() === "" ||
    itemData.veg.trim() === "" ||
    itemData.dishType.trim() === "" ||
    itemData.price.trim() === "" ||
    base64Image.trim() === "" ||
    selectedCategory.trim() === ""||
    updateLoading||
    loading
  }
>
  {preview === "preview"
    ? updateLoading
      ? "Updating Item..."
      : "Update Item"
    : loading
    ? "Adding Item..."
    : "Add Item"}
</button>

  )}
</div>
          </form>
   

        </div>
      </section>
    </>
  );
}
