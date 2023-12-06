import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, deleteItem } from '../../../redux/items/itemThunk';

const DeleteConfirmationModal = ({categories, itemToDelete,show, onDelete, onCancel }) => {

   const dispatch= useDispatch()
    const deleteLoading=useSelector((state)=>state.deleteitem.d_itemLoading)
    const deleteLoadingCategory=useSelector((state)=>state.deletecategory.d_categoryLoading)


    const deleteitem=()=>{
        // (itemToDelete)
        dispatch(deleteItem(itemToDelete))
    }
   
  return (
   <>
     <div className="modal fade"  tabIndex={-1}  id="deleteModel"  aria-labelledby="deleteModel" aria-hidden="true">
      <div className=" modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" className='close'>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete {itemToDelete?.name}
          </div>
          <div className="modal-footer">
           
            <button type="button" className="btn btn-danger" onClick={deleteitem}>
              {deleteLoading?"Deleting...":"Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade"  tabIndex={-1}  id="deleteModelCategory"  aria-labelledby="deleteModelCategory" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" className='close'>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete {categories?.name}
          </div>
          <div className="modal-footer">
           
            <button type="button" className="btn btn-danger" onClick={()=>{  dispatch(deleteCategory(categories));}}>
              {deleteLoadingCategory?"Deleting...":"Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
   </>
    
  );
};

export default DeleteConfirmationModal;
