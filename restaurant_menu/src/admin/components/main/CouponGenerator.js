import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { generateCoupen } from "../../../redux/coupon/couponCodeThunk";
import { useContext } from "react";
import RestaurantContext from "../../../context/RestaurantContext";

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
    <div className={expanded ? "dashboard" : "dashboardcollapsed"}>
      <div className="">
      <div className="coupon-container">
        <h2>Create Coupon</h2>
        <form className="coupon-form">
          <div className="input-group">
            <label htmlFor="couponName">Coupon Name:</label>
            <input
              type="text"
              id="couponName"
              value={couponName}
              onChange={(e) => setCouponName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="discount">Discount (%):</label>
            <input
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="modal-footer">
          <button
            type="button"
            className="btn text-light "
            style={{ backgroundColor: "purple" }}
            onClick={generateCoupon}
            disabled={
              discount.trim() === "" ||
              couponName.trim() === "" ||
              generateCoupenCodeLoading
            }
          >
            {generateCoupenCodeLoading ? " Generating..." : " Generate Coupon"}
          </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default CouponGenerator;
