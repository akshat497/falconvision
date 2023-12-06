import React, { useContext, useEffect, useState } from 'react';
import Header from '../common/Header';
import "../../style/adminstyle.css"

import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory,updateCategory } from '../../../redux/items/itemThunk';
import CategoryTable from './CategoryTable';
import RestaurantContext from '../../../context/RestaurantContext';
export default function AddCategory() {

    const dispatch = useDispatch();
    const {expanded}=useContext(RestaurantContext);
    const loading = useSelector((state) => state.addcategory.categoryloading);
    const deleteLoading = useSelector((state) => state.deletecategory.d_categoryLoading);
    const fullFilled = useSelector((state) => state.fetchcategory.fetchedcategory);
    const restroDetails=useSelector((state)=>state.restrodetail.restro) 
const updateLoading=useSelector((state)=>state.updatecategory.u_categoryloading)
  const [itemData, setItemData] = useState({name: ''});
  const [FetchedCategories, setFetchedCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };
  useEffect(()=>{
if(fullFilled!==null){
  setFetchedCategories(fullFilled)
}
  },[fullFilled]);
  useEffect(()=>{
    setFetchedCategories(fullFilled)
      },[]);
  const handleSubmit = (e) => {
  
    e.preventDefault();
    const categoryBody={
        name:itemData?.name,
        userId:restroDetails?.userId,
        isActive:true
    }
    dispatch(addCategory(categoryBody));
    // dispatch(fetchCategory(categoryBody.userId));
    setItemData({
      name: '',
      
    });
  };
  
  //   
  //   const userId = restroDetails?.userId;
  //   dispatch(fetchCategory(userId));
  // }, [restroDetailsLoading,loading,deleteLoading,updateLoading]);
  // useEffect(()=>{
  //   dispatch(fetchRestraurantDetails()); 
  // },[])
  // useEffect(() => {
   
  //     setFetchedCategories(fullFilled);
    
  // }, [fullFilled]);

//   const handleDelete = (category) => {
//   
//     ;
   
//     dispatch(deleteCategory(category));
//    if(deleteResp===1){
//     
//     dispatch(fetchCategory(category));

//    }
    
//   };

 

//   useEffect(()=>{
//     const userId = "f1ef3df2-f7cb-4710-a91a-9894e4b46f78";
//     dispatch(fetchCategory(userId));
//   },[])
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
  return (
  <>
  {/* <Header/> */}
  
  {loading||updateLoading||deleteLoading?<div className='overlay'></div>:null}
      <section className={expanded?" ":""}>
    <div className="add-item-container" style={{height:"250px"}}>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={itemData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="bottom-buttons " style={{marginLeft:"75%"}}>
        <button type="submit" className="btn btn-primary" disabled={loading||itemData.name.trim()===""} style={{backgroundColor:"purple"}}>
          {loading?"Adding Category...":"Add Category"}
        </button>
        </div>
      
      </form>
    </div>
    {/* <CategoryTable
          categories={FetchedCategories}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          deleteLoading={deleteLoading}
        /> */}
        
    </section>
    {/* {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button onClick={closeModal} className="btn-close" aria-label="Close" />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-footer">
                <button onClick={closeModal} className="btn btn-secondary">
                  Close
                </button>
                <button onClick={openModal} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
  </>
  );
}
