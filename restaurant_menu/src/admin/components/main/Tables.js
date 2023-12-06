import React from "react";
import ItemDatatable from "./ItemDataTable";
import CategoryTable from "./CategoryTable";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { updateCategory } from "../../../redux/items/itemThunk";
import AddItem from "./AddItem";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useContext } from "react";
import RestaurantContext from "../../../context/RestaurantContext";
import { useLocation, useParams } from "react-router-dom";
import CoupenDataTable from "./CoupenDataTable";

export default function Tables() {
  const fullFilled = useSelector(
    (state) => state.fetchcategory.fetchedcategory
  );
  const response = useSelector((state) => state.fetchitem.f_item);
  const deleteLoading = useSelector(
    (state) => state.deletecategory.d_categoryLoading
  );
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const { expanded, isDarkMode } = useContext(RestaurantContext);
  const ref = useRef();
  const dispatch = useDispatch();
  const [FetchedCategories, setFetchedCategories] = useState([]);
  const [fetcheditems, setFetchedItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showDataTable, setShowDataTable] = useState(false);
  const [showCouponTable, setShowCouponTable] = useState(false);
  const [showMenuDataTable, setShowMenuDataTable] = useState(true); // Initialize CategoryTable as visible
  const [Categories, setCategories] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();

  // Log the item to check if it's correctly received
  useEffect(() => {
    const data = location?.state?.item;
   
    if (location.state !== null) {
      if (data?.type === "menu") {
        setShowMenuDataTable(true);
        setShowDataTable(false);
        setShowCouponTable(false)
        // setSearchText(data);
      }
      if (data?.type === "category") {
        setShowMenuDataTable(false);
        setShowDataTable(true);
        setShowCouponTable(false)
        // setSearchText(data);
      }
      if (data?.type === "coupon") {
        setShowMenuDataTable(false);
        setShowDataTable(false);
        setShowCouponTable(true)
        // setSearchText(data);
      }
    }else {
      // Clear search text when switching between tabs
      setSearchText("");
    }
  }, [location]);

  const handleUpdate = (data) => {
    setEditingItem(data);
    ref.current.click();
  };

  const handleDelete = (data) => {
    setItemToDelete(data);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      // Dispatch your deleteItem action here
      // Close the confirmation modal
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    if (response !== null) {
      setFetchedItems(response);
    }
  }, [response]);

  useEffect(() => {
    if (fullFilled !== null) {
      setFetchedCategories(fullFilled);
    }
  }, [fullFilled]);

  // const handleDeleteCategory = async (category) => {
  //     (category)
  //      setCategories(category);

  //   };

  const handleUpdateCategory = (clickedrow, updatedData) => {
    // Implement update logic here and update the categories state
    // (clickedrow)
    const body = {
      categoryId: clickedrow.categoryId,
      name: updatedData.name,
      userId: restroDetails?.userId,
      isActive: clickedrow?.isActive,
    };
    dispatch(updateCategory(body));
  };

  return (
    <div
      className={`dashboard ${
        expanded
          ? isDarkMode
            ? "bg-dark"
            : ""
          : isDarkMode
          ? "dashboardcollapsed bg-dark"
          : "dashboardcollapsed"
      }`}
    >
      <div className="mb-5">
        <button
          className={showMenuDataTable ? `btn btn-secondary mx-2` : "btn mx-2"}
          onClick={() => {
            setShowMenuDataTable(true);
            setShowDataTable(false);
            setShowCouponTable(false)
          }}
        >
          {" "}
          Menu Items
        </button>
        <button
          className={showDataTable ? `btn btn-secondary` : "btn"}
          onClick={() => {
            setShowDataTable(true);
            setShowMenuDataTable(false);
            setShowCouponTable(false)
          }}
        >
          {" "}
          Category 
        </button>
        <button
          className={showCouponTable ? `btn btn-secondary` : "btn"}
          onClick={() => {
            setShowDataTable(false);
            setShowMenuDataTable(false);
            setShowCouponTable(true)
          }}
        >
          {" "}
          Coupons 
        </button>
        

        {showMenuDataTable ? (
          <ItemDatatable
            data={fetcheditems || []}
            onRowUpdate={handleUpdate}
            onRowDelete={handleDelete}
            showDataTable={showDataTable}
            fetcheditems={fetcheditems}
            setfetcheditems={setFetchedItems}
            setItemToDelete={setItemToDelete}
            itemToDelete={itemToDelete}
            searchedText={searchText}
          />
        ) : ""}
        {showDataTable ? (
          <CategoryTable
            categories={FetchedCategories || []}
            searchedText={searchText}
            onUpdate={handleUpdateCategory}
            deleteLoading={deleteLoading}
          />
        ) : ""}
        {showCouponTable ? (
          <CoupenDataTable/>
        ) : ""}
      </div>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade centered"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
             
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <AddItem preview={"preview"} clickedItem={editingItem} />
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        onDelete={confirmDelete}
        onCancel={() => setShowDeleteConfirmation(false)}
        itemToDelete={itemToDelete}
        //!SECTION

        categories={Categories}
      />
    </div>
  );
}
