import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, deleteItem } from "../../../redux/items/itemThunk";

const DeleteConfirmationModal = ({
  categories,
  itemToDelete,
  
}) => {
  const dispatch = useDispatch();
  const categoryCloseref=useRef();
  const itemCloseref=useRef()

  const deleteLoading = useSelector((state) => state.deleteitem.d_itemLoading);
  const deleteCategoryResponse = useSelector((state) => state.deletecategory.d_category);
  const deleteItemResponse = useSelector((state) => state.deleteitem.d_item);
  const deleteLoadingCategory = useSelector(
    (state) => state.deletecategory.d_categoryLoading
  );
  useEffect(()=>{

    if(deleteCategoryResponse?.success===true){
      categoryCloseref.current.click()
    }
    if(deleteItemResponse?.success===true){
      itemCloseref.current.click()
    }

  },[deleteCategoryResponse,deleteItemResponse])
  const deleteitem = () => {
    // (itemToDelete)
   
      const obj={
          menuItemIds:[itemToDelete.menuItemId],
          userId:itemToDelete.userId
      }
      dispatch(deleteItem(obj));
  };

  return (
    <>
      <div
        className="modal fade"
        tabIndex={-1}
        id="deleteModel"
        aria-labelledby="deleteModel"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="close"
                ref={itemCloseref}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete <b>{itemToDelete?.name}</b>
              <p>
                <small>
                  {" "}
                  <strong className="text-danger">
                    This action cannot be undone.
                  </strong>
                </small>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteitem}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        tabIndex={-1}
        id="deleteModelCategory"
        aria-labelledby="deleteModelCategory"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="close"
                ref={categoryCloseref}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete <b>{categories?.name}</b> category
              <p>
                <small>
                  <strong className="text-danger">
                    Warning: This action cannot be undone. Deleting this
                    category will also delete all associated menu items.
                  </strong>
                </small>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  const obj={
        categoryIds:[categories.categoryId],
        userId:categories.userId
    };
                  dispatch(deleteCategory(obj));
                }}
              >
                {deleteLoadingCategory ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
