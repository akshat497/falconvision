import React, { useContext, useEffect, useRef, useState } from "react";
// import RestaurantContext from '../../context/RestaurantContext'
import {
  FaEdit,
  FaInfoCircle,
  FaRegDotCircle,
  FaRupeeSign,
  FaTrashAlt,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItem } from "../../../redux/items/itemThunk";
import AddItem from "./AddItem";
import RestaurantContext from "../../../context/RestaurantContext";

import ItemDatatable from "./ItemDataTable";

import ReactSwitch from "react-switch";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import NoDatComponent from "../../../components/common/NoDatComponent";
export default function Preview() {
  const dispatch = useDispatch();
  const ref = useRef();
  const { expanded, isDarkMode } = useContext(RestaurantContext);
  const response = useSelector((state) => state.fetchitem.f_item);
  const fetchLoading = useSelector((state) => state.fetchitem.f_itemloading);
  // const deleteResponse = useSelector((state) => state.deleteitem.d_item);
  const deleteLoading = useSelector((state) => state.deleteitem.d_itemLoading);
  const updateLoading = useSelector((state) => state.updateitem.u_Itemloading);
  //    const {cartItems,setcartItems}= useContext(RestaurantContext);
  const [fetcheditems, setfetcheditems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showDataTable, setShowDataTable] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const handlePopoverToggle = (menuItemId) => {
    setPopoverVisible((prev) => ({
      ...prev,
      [menuItemId]: !prev[menuItemId],
    }));
  };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  //    const addItemToCart = () => {
  //      // Increase the quantity when the "Add" button is clicked
  //      setQuantity(quantity + 1);
  //      // Add the item to the cartItems state
  //      setcartItems([...cartItems, { id: 2, name: 'Item 2', price: 8.00, quantity: quantity}]);
  //    };

  //    const removeItemFromCart = () => {
  //      // Decrease the quantity when the "-" button is clicked
  //      if (quantity > 0) {
  //        setQuantity(quantity - 1);
  //        // Remove the item from the cartItems state (assuming the last item with the same name)
  //        const updatedCartItems = cartItems.filter(item => item.name !== 'Item 1');
  //        setcartItems(updatedCartItems);
  //      }
  //    }
  const handleUpdate = (data) => {
    setEditingItem(data);
    ref.current.click();
  };

  const handleDelete = (data) => {
    setItemToDelete(data);
    //  setShowDeleteConfirmation(true);
    // dispatch(deleteItem(data))
    //  if(deleteResponse===1){

    //     dispatch(fetchItem(restroDetails?.userId))
    //     setfetcheditems(response)
    //  }
  };
  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteItem(itemToDelete));

      // Close the confirmation modal
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
    }
  };
  //  useEffect(()=>{

  //   if(deleteResponse!==null){
  //     dispatch(fetchItem(restroDetails?.userId))
  //   setfetcheditems(response)
  //   }
  //  },[deleteResponse])

  //  useEffect(()=>{
  //   dispatch(fetchItem(restroDetails?.userId))

  //  },[]);

  //  useEffect(()=>{
  //   if(restroDetails!==null){
  //     dispatch(fetchItem(restroDetails?.userId))
  //    }
  //  },[restroDetails])
  useEffect(() => {
    if (response !== null) {
      setfetcheditems(response);
    }
  }, [response]);
  useEffect(() => {
    setfetcheditems(response);
  }, []);
  //  const handleView=(checked)=>{
  //   setShowDataTable(checked);
  //  }
  const SkeletonItem = () => (
    <div className="card mx-2 my-2 skeleton-card" style={{ width: "18rem" }}>
      <div className="skeleton-thumbnail"></div>
      <div className="card-body">
        <div className="skeleton-title"></div>
        <div className="skeleton-subtitle"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
  const handleToggleActive = (row) => {
    const formdata = new FormData();

    // Assuming `itemData` and `restroDetails` are defined

    formdata.append("name", row.name);
    formdata.append("userId", row?.userId);
    formdata.append("categoryId", row?.categoryId);
    formdata.append("menuItemId", row?.menuItemId);
    formdata.append("isActive", !row?.isActive);

    dispatch(updateItem({ formdata, userId: row?.userId }));
  };

  return (
    <>
      {fetchLoading || deleteLoading || updateLoading ? (
        <div className="overlay"></div>
      ) : null}
      {showDataTable ? (
        <>
          <ItemDatatable
            data={fetcheditems}
            onRowUpdate={handleUpdate}
            onRowDelete={handleDelete}
            showDataTable={showDataTable}
            // handleView={handleView}
            fetcheditems={fetcheditems}
            setfetcheditems={setfetcheditems}
            setItemToDelete={setItemToDelete}
            itemToDelete={itemToDelete}
          />
        </>
      ) : (
        <section
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
          {fetcheditems?.length < 1 && (
            <>
              <NoDatComponent />
            </>
          )}

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {!fetchLoading
              ? fetcheditems?.map((data, index) => (
                  <div
                    className="card mx-4 my-4"
                    key={index}
                    style={{
                      width: "100%",
                      maxWidth: "350px",
                      borderRadius: "8px",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                      opacity:
                        data?.isActive || data?.Category?.isActive
                          ? "1"
                          : "0.5",
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_BASE_URL_FOR_IMAGES}${data?.imageUrl}`}
                        className="card-img-left"
                        alt="FoodImage"
                        style={{
                          width: "40%",
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px",
                        }}
                      />
                      <div
                        className="card-body"
                        style={{ width: "60%", padding: "1rem" }}
                      >
                        <div className="card-title d-flex  ">
                          <div
                            className="d-flex justify-content-between"
                            style={{ width: "120%" }}
                          >
                            <div className="card-title">
                              <h5>
                                {data?.name &&
                                  data.name
                                    .split("")
                                    .map((char, index) => {
                                      return index % 5 === 0 && index !== 0
                                        ? " " + char
                                        : char;
                                    })
                                    .join("")}
                              </h5>
                            </div>

                            <div className="d-flex">
                              <div className="badge-container  ">
                                {data?.veg ? (
                                  <div
                                    className="badge "
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    <FaRegDotCircle
                                      className="text-success"
                                      size={20}
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="badge "
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    <FaRegDotCircle
                                      className="text-danger"
                                      size={20}
                                    />
                                  </div>
                                )}
                              </div>
                              <div
                                className=""
                                style={{
                                  position: "relative",
                                  display: "inline-block",
                                }}
                              >
                                <FaInfoCircle
                                  size={22}
                                  onClick={() =>
                                    handlePopoverToggle(data.menuItemId)
                                  }
                                  style={{ cursor: "pointer", color: "purple" }}
                                />

                                {popoverVisible[data.menuItemId] && (
                                  <div
                                    className="popover"
                                    style={{
                                      visibility: popoverVisible[
                                        data.menuItemId
                                      ]
                                        ? "visible"
                                        : "hidden",
                                      opacity: popoverVisible[data.menuItemId]
                                        ? 1
                                        : 0,
                                      // "auto" may be used depending on the browser
                                    }}
                                  >
                                    {/* Popover content goes here */}

                                    <div>{data.description}</div>
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "100%",
                                        width: 0,
                                        height: 0,
                                        borderTop: "8px solid transparent",
                                        borderBottom: "8px solid transparent",
                                        borderLeft: "8px solid #fff", // Same as background color of the popover
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="card-rating">{data?.rating}</p>
                        </div>
                        <p
                          className="card-price d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div>
                            <FaRupeeSign /> {data.price}
                          </div>

                          <div className="">
                            <ReactSwitch
                              onChange={() => handleToggleActive(data)}
                              checked={data?.isActive}
                              id={`switch-${data?.categoryId}`}
                              onColor="#800080" // Set the color when the switch is on (purple)
                              offColor="#d3d3d3"
                            />
                          </div>
                        </p>
                        <div className="card-buttons d-flex justify-content-between mt-4">
                          <span
                            disabled={!data?.isActive}
                            onClick={() => {
                              handleUpdate(data);
                            }}
                            value={data?.menuItemId}
                            style={{ color: "purple", cursor: "pointer" }}
                          >
                            <FaEdit size={34} />
                          </span>
                          <span
                            className="text-danger"
                            onClick={() => {
                              setItemToDelete(data);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModel"
                            disabled={!data?.isActive}
                            value={data?.menuItemId}
                            style={{ cursor: "pointer" }}
                          >
                            <FaTrashAlt size={32} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}

            {fetchLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <SkeletonItem key={index} />
                ))
              : null}
          </div>

          {/* Button trigger modal */}
        </section>
      )}
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
              <h5 className="modal-title" id="exampleModalLabel"></h5>
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
      />
    </>
  );
}
