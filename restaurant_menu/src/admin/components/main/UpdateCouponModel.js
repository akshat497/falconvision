import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateCoupon } from '../../../redux/coupon/couponCodeThunk';

export default function UpdateCouponModel({row}) {
    const [name, setname] = useState('')
    const [discount, setdiscount] = useState('');
    const closeUpdateCoupen=useRef()
    const dispatch=useDispatch()
    // const restroDetails = useSelector((state) => state.restrodetail.restro);
    const updatingCoupon = useSelector((state) => state.updatecoupon.updatecouponloading);
    const updatedCoupon = useSelector((state) => state.updatecoupon.updatecoupon);
   
   useEffect(()=>{
    if(updatedCoupon?.success===true){
      closeUpdateCoupen.current.click();
   
    }
   },[updatedCoupon])
    useEffect(()=>{
       
        setdiscount(row?.discount)
        setname(row?.name)
    },[row])
    const handleUpdate=()=>{
        if (!name.trim()) {
            toast.warn("Please enter a valid coupon name.", {
              closeButton: false,
              closeOnClick: true,
              autoClose: false,
            });
            return;
          }
      
          // Validate discount
          const parsedDiscount = parseFloat(discount);
          if (isNaN(parsedDiscount) || parsedDiscount <= 0 || parsedDiscount > 100) {
            toast.warn(
              "Please enter a valid discount percentage (greater than 0 and less than or equal to 100)."
            );
            return;
          }
          const obj={
            name:name,
            discount:discount,
            userId:row?.userId,
            CoupenCodeId:row?.CoupenCodeId,
            isActive:row?.isActive
          }
          dispatch(updateCoupon(obj))
    }
  return (
    <div className="modal fade" tabIndex={-1} id="updatecoupon" aria-labelledby="updatecoupon" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Coupon</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeUpdateCoupen}></button>
          </div>
          <div className="modal-body">
          <div>
     
     <div className="mb-3">
       <label htmlFor="name" className="form-label">Name</label>
       <input
         type="text"
         className="form-control"
         id="name"
         placeholder="Enter coupon name"
         value={name}
         onChange={(e) => setname(e.target.value)}
       />
     </div>
     <div className="mb-3">
       <label htmlFor="discount" className="form-label">Discount (%)</label>
       <input
         type="number"
         className="form-control"
         id="discount"
         placeholder="Enter Discount"
         value={discount}
         onChange={(e) => setdiscount(e.target.value)}
       />
     </div>
     
    </div>
          </div>
          <div className="modal-footer">
          <button className='btn text-light' style={{background:"purple"}} onClick={handleUpdate} disabled={updatingCoupon}>{updatingCoupon?"Updating...":"Update"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
