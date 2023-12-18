import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../../../../redux/contactus/contactusthunk';

const DeleteModal = ({ itemToDelete }) => {

   const dispatch= useDispatch()
    const deleteLoading=useSelector((state)=>state.deleteitem.d_itemLoading)
    const deleteLoadingCategory=useSelector((state)=>state.deletecategory.d_categoryLoading)


    const deleteitem=()=>{
        // (itemToDelete)
        dispatch(deleteContact(itemToDelete?.contactUsId))
    }
   
  return (
   <>
     <div className="modal fade"  tabIndex={-1}  id="deleteSuperAdminModel"  aria-labelledby="deleteSuperAdminModel" aria-hidden="true">
      <div className=" modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" className='close'>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete message of {itemToDelete?.name}
           <p><small> <strong className='text-danger'>This action cannot be undone.</strong></small></p>
          </div>
          <div className="modal-footer">
           
            <button type="button" className="btn btn-danger" onClick={deleteitem}>
              {deleteLoading?"Deleting...":"Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
   
   </>
    
  );
};

export default DeleteModal;
