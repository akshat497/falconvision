import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCoupon } from '../../../redux/coupon/couponCodeThunk';

const DeleteCouponModal = ({row }) => {

   const dispatch= useDispatch()
    const deleteLoading=useSelector((state)=>state.deletecoupon.deletecouponLoading)
    // const updatingCoupon = useSelector((state) => state.updatecoupon.updatecouponloading);
    
    // const deleteLoadingCategory=useSelector((state)=>state.deletecategory.d_categoryLoading)


    const deleteitem=()=>{
        // (itemToDelete)
        const obj={
            CoupenCodeId:row?.CoupenCodeId,
            userId:row?.userId
        }
        dispatch(deleteCoupon(obj))
    }
   
  return (
   <>
     <div className="modal fade"  tabIndex={-1}  id="deleteCouponModel"  aria-labelledby="deleteCouponModel" aria-hidden="true">
      <div className=" modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" className='close'>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete <b>{row?.name} </b>Coupon
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

export default DeleteCouponModal;
