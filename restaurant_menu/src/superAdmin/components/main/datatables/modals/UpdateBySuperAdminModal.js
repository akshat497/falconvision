import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../../redux/users/userthunk";

const UpdateBySuperAdminModal = ({ itemToUpdate }) => {
  const dispatch = useDispatch();
  const updateLoading = useSelector(
    (state) => state.updateUser.updateUserloading
  );
  const restrodetail = useSelector((state) => state.restrodetail.restro);

  console.log(itemToUpdate);
  // State to manage form fields and active step
  const [activeStep, setActiveStep] = useState(0);

  const [updatedData, setUpdatedData] = useState({});
  useEffect(() => {
    setUpdatedData({
      name: itemToUpdate?.name,
      address: itemToUpdate?.address,
      area: itemToUpdate?.area,
      zip: itemToUpdate?.zip,
      userId: itemToUpdate?.userId,
      isActive: itemToUpdate?.isActive || false,
      role: itemToUpdate?.role,
    });
  }, [itemToUpdate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const updateItem = () => {
    const selectedRole = updatedData.role;
    const obj = {
      name: updatedData.name,
      address: updatedData.address,
      area: updatedData.area,
      zip: updatedData.zip,
      userId: updatedData.userId,
      role: selectedRole,
    };
   
    console.log(restrodetail)

    dispatch(updateUser(obj));

    // dispatch(updateContact(itemToUpdate?.contactUsId, { ...updatedData, role: selectedRole }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleRadioChange = (selectedRole) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));
  };

  return (
    <div
      className="modal fade"
      tabIndex={-1}
      id="updateSuperAdminModel"
      aria-labelledby="updateSuperAdminModel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update User Details</h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {activeStep === 0 && (
              <div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={updatedData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={updatedData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="area" className="form-label">
                    Area:
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    className="form-control"
                    value={updatedData.area}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip:
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="form-control"
                    value={updatedData.zip}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div>
                <h2>Role:</h2>
                <div className="mb-3 form-check">
                  <input
                    type="radio"
                    id="superadmin"
                    name="role"
                    className="form-check-input"
                    checked={updatedData.role === "superadmin"}
                    onChange={() => handleRadioChange("superadmin")}
                  />
                  <label htmlFor="superadmin" className="form-check-label">
                    Superadmin
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="radio"
                    id="franchise"
                    name="role"
                    className="form-check-input"
                    checked={updatedData.role === "franchise"}
                    onChange={() => handleRadioChange("franchise")}
                  />
                  <label htmlFor="franchise" className="form-check-label">
                    Franchise
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="radio"
                    id="subfranchise"
                    name="role"
                    className="form-check-input"
                    checked={updatedData.role === "subfranchise"}
                    onChange={() => handleRadioChange("subfranchise")}
                  />
                  <label htmlFor="subfranchise" className="form-check-label">
                    Subfranchise
                  </label>
                </div>
              </div>
            )}
          </div>
          <div
            className="modal-footer"
            style={{ justifyContent: "space-between" }}
          >
            <button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="btn"
            >
              <FaArrowLeft />
            </button>
            {activeStep === 1 ? (
              <button
                onClick={updateItem}
                disabled={updateLoading}
                style={{ backgroundColor: "purple", border: "none" }}
                className="btn text-light"
              >
                {updateLoading ? "Updating..." : "Update"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{ backgroundColor: "purple", border: "none" }}
                className="btn text-light"
              >
                <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBySuperAdminModal;
