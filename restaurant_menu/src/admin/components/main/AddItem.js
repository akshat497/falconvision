import React, { useContext, useEffect, useRef, useState } from "react";

import "../../style/adminstyle.css";
import { FaArrowLeft, FaArrowRight, FaUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem, fetchItem, updateItem } from "../../../redux/items/itemThunk";
import RestaurantContext from "../../../context/RestaurantContext";
import { toast } from "react-toastify";
import { showToast } from "../../../services/ToastInstance";

export default function AddItem({ preview, clickedItem }) {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { expanded } = useContext(RestaurantContext);
  // (clickedItem);
  // const {restroDetails}=useContext(RestaurantContext)
  const restroDetails = useSelector((state) => state.restrodetail.restro);
const addItemReponse=useSelector((state)=>state?.addItem?.item);
  const loading = useSelector((state) => state.addItem.itemloading);
  const updateLoading = useSelector((state) => state.updateitem.u_Itemloading);
  const fullFilled = useSelector(
    (state) => state.fetchcategory.fetchedcategory
  );
  
  const [itemData, setItemData] = useState({
    name: "",
    price: "",
    veg: "", // Default to 'Veg'
    dishType: "BreakFast", // Default to 'Breakfast'
    description: "",
  });
  const [FetchedCategories, setFetchedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [image, setimage] = useState('');
  const [DisplayImage, setDisplayImage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [disabled, setdisabled] = useState(true);
  const steps = [0, 1, 2];

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value.length <= 200) {
        setItemData({
          ...itemData,
          [name]: value,
        });
      }
    } else if (name === "name") {
      if (value.length <= 30) {
        setItemData({
          ...itemData,
          [name]: value,
        });
      }
    } else {
      setItemData({
        ...itemData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemData.name) {
      setValidationErrors({ ...validationErrors, name: "Name is required" });
      showToast("Name is required");
      return;
    }

    if (!itemData.price) {
      setValidationErrors({ ...validationErrors, price: "Price is required" });
      showToast("Price is required");
      return;
    }
    if (!selectedCategory) {
      setValidationErrors({
        ...validationErrors,
        category: "category is required",
      });
      showToast("category is required");
      return;
    }
    if (!itemData.veg) {
      setValidationErrors({ ...validationErrors, type: "type is required" });
      showToast("type is required");
      return;
    }

    if (!itemData.description) {
      setValidationErrors({
        ...validationErrors,
        type: "description is required",
      });
      showToast("image is required");
      return;
    }

    if (preview === "preview") {
      
      const formdata = new FormData();

      // Assuming `itemData` and `restroDetails` are defined

      formdata.append("name", itemData.name);
      formdata.append("userId", restroDetails?.userId);
      formdata.append("categoryId", selectedCategory);
      formdata.append("menuItemId",clickedItem.menuItemId,);
      formdata.append("price",  parseFloat(itemData.price));
      formdata.append("imageUrl", image);
      formdata.append("veg", itemData?.veg === "veg" ? true : false);
      formdata.append("type", itemData?.dishType);
      formdata.append("description", itemData?.description);
      
      dispatch(updateItem({formdata,userId:restroDetails?.userId}));
    }
    if (
      preview === "" ||
      !preview ||
      preview === null ||
      preview === undefined
    ) {
      const formdata = new FormData();

      // Assuming `itemData` and `restroDetails` are defined

      formdata.append("name", itemData.name);
      formdata.append("userId", restroDetails?.userId);
      formdata.append("categoryId", selectedCategory);
      formdata.append("price",  parseFloat(itemData.price));
      formdata.append("imageUrl", image);
      formdata.append("veg", itemData?.veg === "veg" ? true : false);
      formdata.append("type", itemData?.dishType);
      formdata.append("description", itemData?.description);
      // const body = {
      //   name: itemData.name,
      //   userId: restroDetails?.userId,
      //   categoryId: selectedCategory,
      //   price: Number(itemData.price),
      //   imageUrl: image,
      //   veg: itemData?.veg === "veg" ? true : false,
      //   type: itemData?.dishType,
      //   description:itemData?.description
      // };

      dispatch(addItem({formdata,userId:restroDetails?.userId}));
    }
    
  
  };
  useEffect(()=>{
    if(addItemReponse?.success===true){
      resetForm();
    }
   
  },[addItemReponse])
  const resetForm = () => {
    setItemData({
      name: "",
      price: "",
      dishType: "",
      veg: "",
      description: "",
    });

    setimage('');
    setDisplayImage('')
    setSelectedCategory('');
    setValidationErrors({});
  };

  useEffect(() => {
    if (preview) {
    
      setItemData({
        name: clickedItem?.name,
        price: clickedItem?.price,
        dishType: clickedItem?.type,
        veg: clickedItem?.veg===true ? "veg" : "Non-Veg",
        description: clickedItem?.description,
      });
      // (itemData)
    }
    setSelectedCategory(clickedItem?.Category?.categoryId);
    setimage(clickedItem?.imageUrl);
  }, [clickedItem]);

  
  const convertImage = (e) => {
    const file = e.target.files[0];
  
    // Check if the selected file is an image
    if (file && file.type.startsWith("image/")) {
      setimage(file);
      
      const reader = new FileReader();
  
      // Define the onLoad callback function
      reader.onload = (event) => {
        // Set the data URL to the state
        setDisplayImage(event.target.result);
      };
  
      // Read the file as a data URL
      reader.readAsDataURL(file);
    } else {
      showToast("Please select an image.");
    }
  };
  
  

  useEffect(() => {
    if (fullFilled !== null) {
      setFetchedCategories(fullFilled);
    }
  }, [fullFilled]);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
  
    setSelectedCategory(selectedCategoryId);
  };

  return (
    <>
    
      {loading ? <div className="overlay"></div> : null}
      <section className={preview === "preview" ? "" : expanded ? " " : ""}>
        <div className={preview ? "add-item-container" : "add-item-container"}>
          <form onSubmit={handleSubmit}>
            {/* Render the form fields based on the current step */}

            {currentStep === 0 && (
              <>
                <h2>{preview === "preview" ? "Update Dish" : "Add Dish"}</h2>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    value={itemData?.name || ''}

                    placeholder="Enter Dish Name"
                    onChange={handleInputChange}
                    required
                  />
                    <small>{itemData?.name?.length===30?<b>{itemData?.name?.length}</b>:itemData?.name?.length}<span>/</span><b>30</b></small>
                
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    className="form-control"
                    name="price"
                    placeholder="Enter Price"
                    value={itemData?.price|| ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            {currentStep === 1 && (
              <>
                <div className="form-group">
                  <div className="d-flex">
                    <div>
                      {" "}
                      <label htmlFor="category">Upload Image:</label>
                    </div>
                  
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      onClick={() => {
                        fileRef.current.click();
                      }}
                      className="btn fs-2 my-2 me-5"
                    >
                      <FaUpload />
                    </div>
                    <div className="mt-2" style={{ marginLeft: "50%" }}>
                      <img
                        src={preview ? DisplayImage?DisplayImage:`${process.env.REACT_APP_BASE_URL_FOR_IMAGES}${image}` : DisplayImage}
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
                    onChange={convertImage}
                    accept="image/*"
                  />
                  <label htmlFor="category">Category:</label>
                  <select
                    id="category"
                    name="category"
                    className="form-control"
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
                  <div className="form-group">
                    <label htmlFor="veg">Veg/Non-Veg:</label>
                    <select
                      id="veg"
                      name="veg"
                      onChange={handleInputChange}
                      className="form-control"
                    >
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
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="dishType">Type of Dish:</label>
                  <select
                    id="dishType"
                    name="dishType"
                    className="form-control"
                    onChange={handleInputChange}
                  >
                    <option value={""}>
                      {preview ? clickedItem?.type : "Select Dish Type"}
                    </option>
                    <option value="Starters">Appetizers/Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Side Dish">Side Dish</option>
                    <option value="Soup">Soup</option>
                    <option value="Salad">Salad</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Bread">Bread</option>
                    
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Description:</label>
                  <textarea
                    rows={6}
                    id="description"
                    name="description"
                    value={itemData?.description|| ''}
                    className="form-control"
                    placeholder="Enter Description"
                    onChange={handleInputChange}
                    required
                  />
                  <small>{itemData?.description?.length===200?<b>{itemData?.description?.length}</b>:itemData?.description?.length}<span>/</span><b>200</b></small>
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
                  disabled={currentStep === 0}
                >
                  <FaArrowLeft />
                </button>
              )}
              {currentStep < steps.length - 1 && (
                <button type="button" className="btn " onClick={goToNextStep}>
                  <FaArrowRight />
                </button>
              )}
              {currentStep === steps.length - 1 && (
                <button
                  type=""
                  className="btn"
                  style={{ backgroundColor: "purple" }}
                  disabled={
                    itemData?.name?.trim() === "" ||
                    itemData?.veg?.trim() === "" ||
                    itemData?.dishType?.trim() === "" ||
                    itemData?.price?.trim() === "" ||
                   
                    selectedCategory?.trim() === "" ||
                    updateLoading ||
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
