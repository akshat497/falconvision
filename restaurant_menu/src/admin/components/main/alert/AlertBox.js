import React, { useState } from "react";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, deleteItem } from "../../../../redux/items/itemThunk";
import { deleteCoupon } from "../../../../redux/coupon/couponCodeThunk";
import iconstrash from "../../../../images/icons8-trash.gif"
import { deleteContact } from "../../../../redux/contactus/contactusthunk";
export default function AlertBox({ selectedRows }) {
  const dispatch = useDispatch();
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const deleteLoading=useSelector((state)=>state.deletecoupon.deletecouponLoading);
  const deleteLoadingCategory = useSelector(
    (state) => state.deletecategory.d_categoryLoading
  );
  const deleteLoadingMenu = useSelector((state) => state.deleteitem.d_itemLoading);
  const deleteLoadingFeedback = useSelector((state) => state.deletecontactus.deletecontactusloading);
 
  // Extract names from selectedRows
  const selectedNames = selectedRows.map((row) => row.name).join(", ");

  // Extract categoryIds from selectedRows
  const selectedCategoryIds = selectedRows.map((row) => row?.categoryId);

  const selectedMenuitems = selectedRows.map((row) => row?.menuItemId);

  const selectedCoupenitems = selectedRows.map((row) => row?.CoupenCodeId);

  const selectedFeedbacks = selectedRows.map((row) => row?.contactUsId);


  const deleteSelectedCategories = () => {
    // Dispatch the action with the array of categoryIds
    const obj = {
      categoryIds: selectedCategoryIds,
      userId: restroDetails.userId,
    };
    dispatch(deleteCategory(obj));
  };
  const deleteSelectedMenuitems = () => {
    const obj = {
      menuItemIds: selectedMenuitems,
      userId: restroDetails.userId,
    };

    dispatch(deleteItem(obj));
  };
  const deleteCoupens = () => {
    // (itemToDelete)
    const obj = {
      CoupenCodeIds: selectedCoupenitems,
      userId: restroDetails?.userId,
    };
    dispatch(deleteCoupon(obj));
  };
  const deleteFeedbacks=()=>{
    const obj={
        contactUsIds: selectedFeedbacks,
        userId: restroDetails?.userId,
    }
    dispatch(deleteContact(obj))
  }
  return (
    <>
      <div
        className="alert alert-danger d-flex"
        role="alert"
        style={{ justifyContent: "space-between" }}
      >
        <div>
          {selectedRows[0]?.categoryId &&
          selectedRows[0]?.userId &&
          !selectedRows[0]?.menuItemId ? (
            <>
              Are you sure you want to delete{" "}
              {selectedRows?.length > 1 ? (
                <b>{selectedRows?.length}</b>
              ) : (
                "this"
              )}{" "}
              {selectedRows?.length > 1 ? "rows" : "row"}?
              <div className="custom-tooltip">
                <FaInfoCircle />
                <span className="tooltip-text">{selectedNames}</span>
              </div>
              <div>
                {" "}
                <p>
                  <small>
                    <strong className="text-danger">
                      Warning: This action cannot be undone. Deleting these
                      category will also delete all associated menu items.
                    </strong>
                  </small>
                </p>
              </div>
            </>
          ) : (
            ""
          )}
          {(selectedRows[0]?.categoryId &&
            selectedRows[0]?.userId &&
            selectedRows[0]?.menuItemId) ||
          selectedRows[0]?.CoupenCodeId ? (
            <>
              Are you sure you want to delete{" "}
              {selectedRows?.length > 1 ? (
                <b>{selectedRows?.length}</b>
              ) : (
                "this"
              )}{" "}
              {selectedRows?.length > 1 ? "rows" : "row"}?
              <div className="custom-tooltip ">
                <FaInfoCircle />
                <div className="tooltip-text  ">{selectedNames}</div>
              </div>
              <div>
                <small>
                  {" "}
                  <strong className="text-danger">
                    This action cannot be undone.
                  </strong>
                </small>
              </div>
            </>
          ) : (
            ""
          )}
          {
            selectedRows[0]?.contactUsId&&(
                <>
              Are you sure you want to delete{" "}
              {selectedRows?.length > 1 ? (
                <b>{selectedRows?.length}</b>
              ) : (
                "this"
              )}{" "}
              {selectedRows?.length > 1 ? "rows" : "row"}?
              <div className="custom-tooltip ">
                <FaInfoCircle />
                <div className="tooltip-text  ">{selectedNames}</div>
              </div>
              <div>
                <small>
                  {" "}
                  <strong className="text-danger">
                    This action cannot be undone.
                  </strong>
                </small>
              </div>
            </>
            )
          }
        </div>
        {selectedRows[0]?.categoryId &&
          selectedRows[0]?.userId &&
          !selectedRows[0]?.menuItemId && (
            <>
            {deleteLoadingCategory?"Processing..":<div
                onClick={() => {
                  deleteSelectedCategories();
                }}
              >
                <FaTrashAlt size={26} style={{ cursor: "pointer" }} />
              </div>}
              
            </>
          )}
        {selectedRows[0]?.userId && selectedRows[0]?.menuItemId && (
          <>
          {deleteLoadingMenu?"Processing...":<div
              onClick={() => {
                deleteSelectedMenuitems();
              }}
            >
              <FaTrashAlt size={26} style={{ cursor: "pointer" }} />
            </div>}
            
          </>
        )}
        {selectedRows[0]?.userId && selectedRows[0]?.CoupenCodeId && (
          <>
          {
            deleteLoading?"Processing...": <div
              onClick={() => {
                deleteCoupens();
              }}
            >
              <FaTrashAlt size={26} style={{ cursor: "pointer" }} />
            </div>
          }
          
           
          </>
        )}
        {selectedRows[0]?.contactUsId && (
          <>
          {
            deleteLoadingFeedback?"Processing...": <div
              onClick={() => {
                deleteFeedbacks();
              }}
            >
              <FaTrashAlt size={26} style={{ cursor: "pointer" }} />
            </div>
          }
          
           
          </>
        )}
      </div>
    </>
  );
}
