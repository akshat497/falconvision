import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { generateCoupen } from "../../../redux/coupon/couponCodeThunk";
import { useContext } from "react";
import RestaurantContext from "../../../context/RestaurantContext";
import coupon_image from "../../../images/coupon_image3-removebg-preview.png"
const CouponGenerator = () => {
  const [couponName, setCouponName] = useState("");
  const [discount, setDiscount] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const restroDetails = useSelector((state) => state.restrodetail.restro);

  const generateCoupenCodeLoading = useSelector(
    (state) => state.generatecoupencode.generatecoupencodeloading
  );
  const { expanded } = useContext(RestaurantContext);
  const generateCoupon = () => {
    // Validate coupon name
    if (!couponName.trim()) {
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
    const obj = {
      name: couponName,
      discount: discount,
      userId: restroDetails?.userId,
    };
    dispatch(generateCoupen(obj));
  };

  return (
    <div className={`dashboard ${expanded ? '' : 'dashboardcollapsed'}`}>
    <div className="coupon-container">
      <h2 className="mb-5">Create Coupon</h2>
      <div className="d-flex" style={{ justifyContent: 'space-between' }}>
        <div>
          <img src={coupon_image} alt="coupon_image" height={300} width={300} />
        </div>
        <div>
          <form className="coupon-form">
            <div className="input-group" >
              <label htmlFor="couponName">Coupon Name:</label>
              <input
                type="text"
                id="couponName"
                className="form-control"
                value={couponName}
                style={{width:"400px",height:"40px"}}
                onChange={(e) => setCouponName(e.target.value)}
              />
            </div>
            <div className="input-group my-3 ">
              <label htmlFor="discount" >Discount (%):</label>
              <input
                type="number"
                id="discount"
                className="form-control "
                style={{width:"400px",height:"40px"}}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer mr-4">
        <button
          type="button"
          className="btn text-light"
          style={{ backgroundColor: 'purple' }}
          onClick={generateCoupon}
          disabled={
            discount.trim() === '' ||
            couponName.trim() === '' ||
            generateCoupenCodeLoading
          }
        >
          {generateCoupenCodeLoading ? 'Generating...' : 'Generate Coupon'}
        </button>
      </div>
    </div>
  </div>
  );
};

export default CouponGenerator;
