import React, { useContext, useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaRupeeSign,
  FaPlus,
  FaMinus,
  FaInfoCircle,
  FaPenAlt,
  FaDotCircle,
  FaRegDotCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import RestaurantContext from "../../context/RestaurantContext";
import NoDatComponent from "../common/NoDatComponent";
import FeedbackModal from "../modals/FeedbackModal";
import feedback from "../../images/feedback-removebg-preview.png";
export default function Card({ veg, nonVeg }) {
  const navigate = useNavigate();
  const {
    fetcheditemsCopy,
    setFetcheditemsCopy,

    activeCategoryId,
    setActiveCategoryId,
  } = useContext(RestaurantContext);

  const fetchLoading = useSelector((state) => state.fetchitem.f_itemloading);
  const originalItems = useSelector((state) => state.fetchitem.f_item);
  // const [fetcheditems, setFetcheditems] = useState([]);
  const restroLoading = useSelector((state) => state.restrodetail.loading);
  const [isAnimating, setIsAnimating] = useState(false);

  const [cart, setCart] = useState([]); // New cart state
  const [popoverVisible, setPopoverVisible] = useState(false);
  const handlePopoverToggle = (menuItemId) => {
    setPopoverVisible((prev) => ({
      ...prev,
      [menuItemId]: !prev[menuItemId],
    }));
  };

  // useEffect(() => {
  //     if (restroDetails !== null) {
  //         dispatch(fetchItem(restroDetails?.userId));
  //     }
  // }, []);

  // useEffect(() => {
  //     if (response !== null) {
  //         setFetcheditems(response);
  //     }
  // }, [response]);

  // Load the cart from localStorage when the component mounts

  useEffect(() => {
    let filteredItems = originalItems;

    // Apply category filter
    if (activeCategoryId) {
      filteredItems = filteredItems.filter(
        (data) => data.Category.categoryId === activeCategoryId
      );
    }

    // Apply veg filter
    if (veg) {
      filteredItems = filteredItems.filter((data) => data.veg);
    }

    // Apply non-veg filter
    if (nonVeg) {
      filteredItems = filteredItems.filter((data) => !data.veg);
    }

    setFetcheditemsCopy(filteredItems);
  }, [activeCategoryId, veg, nonVeg, originalItems, setFetcheditemsCopy]);

  // useEffect(() => {
  //   activeCategoryId
  //   let filteredItems = fetcheditems; // Initialize with the original list

  //   if (veg) {
  //     filteredItems = filteredItems.filter((data) => data.veg === veg);
  //   }

  //   if (nonVeg) {
  //     filteredItems = filteredItems.filter((data) => data.veg !== nonVeg);
  //   }

  //   // Update the state with the filtered items
  //   setFetcheditemsCopy(filteredItems);
  //   // setFetcheditems(filteredItems);
  // }, [veg, nonVeg, originalItems, setFetcheditemsCopy]);
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const saveCartToLocalStorage = (cart) => {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCart = (item) => {
    setCart([...cart, item]);

    // Trigger the animation
    setIsAnimating(true);

    // Reset the animation after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (cartItem) => cartItem.menuItemId === item.menuItemId
    );
    if (index === -1) {
      updatedCart.push({ ...item, quantity: 1 });
    } else {
      updatedCart[index].quantity++;
    }
    setCart(updatedCart);

    // Save the updated cart to localStorage
    saveCartToLocalStorage(updatedCart);
  };

  const removeFromCart = (item) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (cartItem) => cartItem.menuItemId === item.menuItemId
    );
    if (index !== -1) {
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity--;
      } else {
        updatedCart.splice(index, 1);
      }
      setCart(updatedCart);

      // Save the updated cart to localStorage
      saveCartToLocalStorage(updatedCart);
    }
  };

  const SkeletonItem = () => (
    <div
      className="card mx-2 my-2 skeleton-card"
      style={{
        width: "100%",
        maxWidth: "300px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden" }}>
        <div
          className="skeleton-thumbnail"
          style={{
            width: "40%",
            height: "200px",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        ></div>
        <div className="card-body" style={{ width: "60%", padding: "1rem" }}>
          <div
            className="skeleton-title"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              width: "70%",
            }}
          ></div>
          <div
            className="skeleton-subtitle"
            style={{ height: "1rem", width: "50%", marginBottom: "1rem" }}
          ></div>
          <div
            className="skeleton-text"
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              width: "80%",
              marginBottom: "1rem",
            }}
          ></div>
          <div className="d-flex align-items-center">
            <div
              className="skeleton-button"
              style={{
                height: "2rem",
                width: "40%",
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            ></div>
            {/* <div className="skeleton-button" style={{ height: "2rem", width: "40%", borderRadius: "8px" }}></div> */}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div style={{  overflow: "", paddingTop: "2%" }}>
        {fetcheditemsCopy?.length < 1 && <NoDatComponent />}
        {fetchLoading ? <div className="overlay"></div> : null}
        <FeedbackModal />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {!fetchLoading &&
            fetcheditemsCopy?.map((data) => (
              <div
                className="card mx-4 my-4"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  opacity:
                    data?.isActive || data?.Category?.isActive ? "1" : "0.5",
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
                      height: "auto",
                      objectFit: "contain",
                      borderTopLeftRadius: "8px",
                      borderBottomLeftRadius: "8px",
                     borderColor:"black"
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
                        <div className="card-title ">
                          <h5>
                            {data?.name &&
                              data.name
                                .split("")
                                .map((char, index) => {
                                  return index % 8 === 0 &&
                                    index !== 0 &&
                                    char !== " " &&
                                    data.name
                                      .slice(index - 8, index)
                                      .indexOf(" ") === -1
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
                                  visibility: popoverVisible[data.menuItemId]
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
                    <p className="card-price">
                      <FaRupeeSign /> {data.price}
                    </p>
                    <div className="card-buttons">
                      {cart?.find(
                        (item) => item.menuItemId === data.menuItemId
                      ) ? (
                        <>
                          {!data?.isActive || !data?.Category?.isActive ? (
                            <button
                              className="btn btn-secondary"
                              disabled
                              style={{
                                cursor: "not-allowed",
                                padding: "12px",
                                borderRadius: "8px",
                                width: "100%",
                                fontWeight: "750",
                                backgroundColor: "#eee",
                                color: "#666",
                                border: "none",
                              }}
                            >
                              Not Available
                            </button>
                          ) : (
                            <div
                              className="quantity-controls d-flex align-items-center mt-4"
                              style={{
                                padding: "8px",
                                borderRadius: "8px",
                                width: "80%",
                                fontWeight: "750",
                              }}
                            >
                              <button
                                className="btn btn-sm "
                                onClick={() => removeFromCart(data)}
                                style={{
                                  fontSize: "1.5rem",
                                  borderColor: "purple",
                                  color: "purple",
                                }}
                              >
                                <FaMinus />
                              </button>
                              <span
                                className="mx-3 quantity-value "
                                style={{ fontSize: "1.25rem", color: "purple" }}
                              >
                                {cart?.find(
                                  (item) => item.menuItemId === data.menuItemId
                                )?.quantity || 0}
                              </span>
                              <button
                                className="btn btn-sm  add-to-cart-btn"
                                onClick={() => addToCart(data)}
                                style={{
                                  fontSize: "1.5rem",
                                  borderColor: "purple",
                                  color: "purple",
                                }}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div>
                          {!data?.isActive || !data?.Category?.isActive ? (
                            <button
                              className="btn btn-secondary"
                              disabled
                              style={{
                                cursor: "not-allowed",
                                padding: "12px",
                                borderRadius: "8px",
                                width: "100%",
                                fontWeight: "750",
                                backgroundColor: "#eee",
                                color: "#666",
                                border: "none",
                              }}
                            >
                              Not Available
                            </button>
                          ) : (
                            <button
                              className="btn  mt-4"
                              style={{
                                padding: "10px",
                                borderRadius: "8px",
                                width: "100%",
                                fontWeight: "750",
                                // backgroundColor: "purple",
                                borderColor: "purple",
                                color: "purple",
                              }}
                              onClick={() => addToCart(data)}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {fetchLoading || restroLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8]?.map((index) => (
                <SkeletonItem key={index} />
              ))
            : null}
        </div>
      </div>

      <div className="d-flex">
        <div
          className="floating-cart-icon "
          style={{ right: "80px", backgroundColor: "purple", color: "purple" }}
          data-bs-toggle="modal"
          data-bs-target="#FeedbackModal"
        >
          <img
            src={feedback}
            alt="Feedback-icon"
            height={40}
            width={40}
            style={{ color: "purple" }}
          />
        </div>
        <div
          className="floating-cart-icon"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <FaShoppingCart size={32} />
          {savedCart?.length > 0 && (
            <div className="item-count">{savedCart?.length}</div>
          )}
        </div>
      </div>
    </>
  );
}
