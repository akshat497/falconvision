import React, { useState } from "react";
import "../../style/superAdminstyle.css"; // Import your custom stylesheet for additional styling
import SuperAdminHeader from "../common/SuperAdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { extendMembership } from "../../../redux/users/userthunk";

const MembershipExtensionForm = () => {
  const dispatch = useDispatch();
  const membershipLoading = useSelector(
    (state) => state.extendmembership.extendmembershiploading
  );
  const [userId, setUserId] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleNumberOfDaysChange = (e) => {
    setNumberOfDays(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      trialExtensionDays: Number(numberOfDays),
      userId: userId,
    };
    dispatch(extendMembership(obj));
    setUserId("");
    setNumberOfDays("");
  };

  return (
    <>
      <SuperAdminHeader />
      <div className="dashboard">
        <div className="membership-extension-form-container">
          <h2>Membership Extension</h2>
          <form onSubmit={handleSubmit} className="membership-extension-form">
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={handleUserIdChange}
                placeholder="Enter User ID"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfDays">Number of Days to Extend:</label>
              <input
                type="number"
                id="numberOfDays"
                value={numberOfDays}
                onChange={handleNumberOfDaysChange}
                placeholder="Enter Number of Days"
                required
              />
            </div>
            {membershipLoading === false ? (
              <button type="submit" className="submit-button">
                Extend Membership
              </button>
            ) : (
              <button className="submit-button" disabled={membershipLoading}>
                Extending....
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default MembershipExtensionForm;
