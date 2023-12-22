// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { FaShoppingCart, FaRupeeSign } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Header from '../common/Header';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteItem, fetchItem, updateItem } from '../../redux/items/itemThunk';
// import RestaurantContext from '../../context/RestaurantContext';

// export default function Card() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const ref = useRef();
//     const response = useSelector((state) => state.fetchitem.f_item);
//     const fetchLoading = useSelector((state) => state.fetchitem.f_itemloading);
//     const [fetcheditems, setFetcheditems] = useState([]);
//     const restroDetails = useSelector((state) => state.restrodetail.restro);

//     const [cart, setCart] = useState([]); // New cart state

//     useEffect(() => {
//         if (restroDetails !== null) {
//             dispatch(fetchItem(restroDetails?.userId));
//         }
//     }, [restroDetails]);

//     useEffect(() => {
//         if (response !== null) {
//             setFetcheditems(response);
//         }
//     }, [response, fetchLoading]);

//     const addToCart = (item) => {
//       const updatedCart = [...cart];
//       const index = updatedCart.findIndex((cartItem) => cartItem.menuItemId === item.menuItemId);
//       if (index === -1) {
//           updatedCart.push({ ...item, quantity: 1 });
//       } else {
//           updatedCart[index].quantity++;
//       }
//       setCart(updatedCart);
//   };

//   const removeFromCart = (item) => {
//       const updatedCart = [...cart];
//       const index = updatedCart.findIndex((cartItem) => cartItem.menuItemId === item.menuItemId);
//       if (index !== -1) {
//           if (updatedCart[index].quantity > 1) {
//               updatedCart[index].quantity--;
//           } else {
//               updatedCart.splice(index, 1);
//           }
//           setCart(updatedCart);
//       }
//   }

//     const SkeletonItem = () => (
//         <div className={`card mx-3 my-2 bg-`} style={{ width: '18rem' }}>
//             <div className="skeleton-thumbnail"></div>
//             <div className="card-body">
//                 <div className="skeleton-title"></div>
//                 <div className="skeleton-subtitle"></div>
//                 <div className="skeleton-text"></div>
//                 <div className="skeleton-button"></div>
//                 <div className="skeleton-button"></div>
//             </div>
//         </div>
//     );

//     return (
//         <>

//            <div style={{ display: "flex", flexWrap: "wrap" }}>
//                 {fetcheditems?.map((data) => (
//                     <div className="card mx-5 my-2" style={{ width: '18rem' }}>
//                         <img src={data.imageUrl} className="card-img-top" alt="..." />
//                         <div className="card-body">
//                             <h5 className="card-title">{data.name}</h5>
//                             <h7 className="card-text">{data.Category.name}</h7>
//                             <p><FaRupeeSign />{data.price}</p>

//                             <div className="d-flex align-items-center">
//                                 {cart.find((item) => item.menuItemId === data.menuItemId) ? (
//                                     // If the item is in the cart, show "+" and "-" buttons
//                                     <div className="quantity-controls">
//                                         <button
//                                             className="btn btn-sm btn-primary"
//                                             onClick={() => removeFromCart(data)}
//                                         >
//                                             -
//                                         </button>
//                                         <span className="mx-2">{cart.find((item) => item.menuItemId === data.menuItemId)?.quantity || 0}</span>
//                                         <button
//                                             className="btn btn-sm btn-primary"
//                                             onClick={() => addToCart(data)}
//                                         >
//                                             +
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     // If the item is not in the cart, show the "Add to Cart" button
//                                     <button
//                                         className="btn btn-success"
//                                         onClick={() => addToCart(data)}
//                                     >
//                                         Add to Cart
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}

//                 {fetchLoading
//                     ? fetcheditems.map((index) => <SkeletonItem key={index} />)
//                     : null}
//             </div>

//         </>
//     );
// }
import React, { useContext, useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaRupeeSign,
  FaPlus,
  FaMinus,
  FaJediOrder,
  FaFirstOrder,
  FaShoppingBag,
  FaPlusCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import RestaurantContext from "../../context/RestaurantContext";
import NoDatComponent from "../common/NoDatComponent";

export default function Card({ veg, nonVeg }) {
  const navigate = useNavigate();
  const {
    fetcheditemsCopy,
    setFetcheditemsCopy,
    fetcheditems,
    setFetcheditems,
  } = useContext(RestaurantContext);

  const fetchLoading = useSelector((state) => state.fetchitem.f_itemloading);
  const originalItems = useSelector((state) => state.fetchitem.f_item);
  // const [fetcheditems, setFetcheditems] = useState([]);
  const restroLoading = useSelector((state) => state.restrodetail.loading);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cart, setCart] = useState([]); // New cart state

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
    
    let filteredItems = fetcheditems; // Initialize with the original list

    if (veg) {
      filteredItems = filteredItems.filter((data) => data.veg === veg);
    }

    if (nonVeg) {
      filteredItems = filteredItems.filter((data) => data.veg !== nonVeg);
    }

    // Update the state with the filtered items
    setFetcheditemsCopy(filteredItems);
    // setFetcheditems(filteredItems);
  }, [veg, nonVeg, originalItems, setFetcheditemsCopy]);
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
      {fetcheditemsCopy?.length < 1 && <NoDatComponent />}
      {fetchLoading ? <div className="overlay"></div> : null}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {!fetchLoading
          ? fetcheditemsCopy?.map((data) => (
              <div
                className="card mx-4 my-4"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  opacity:data?.isActive || data?.Category?.isActive ? "1" : "0.5",
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
                    src={data.imageUrl}
                    className="card-img-left"
                    alt="Food Image"
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
                    <div
                      className="card-title"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        color: "#333",
                      }}
                    >
                      {data?.name}
                      <small
                        className={
                          data?.veg
                            ? "badge bg-success mx-2 "
                            : "badge bg-danger mx-2"
                        }
                        style={{ fontSize: "0.7rem" }}
                      >
                        {data?.veg ? "veg" : "nonveg"}
                      </small>
                    </div>
                    <p
                      style={{
                        color: "#f84f40",
                        fontSize: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {/* {data?.Category?.name} */}
                    </p>
                    <p
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      <FaRupeeSign /> {data.price}
                    </p>
                    <div className="d-flex align-items-center">
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
                            <div className="quantity-controls d-flex align-items-center mt-4">
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeFromCart(data)}
                                style={{ fontSize: "1.5rem" }}
                              >
                                <FaMinus />
                              </button>
                              <span
                                className="mx-3 quantity-value"
                                style={{ fontSize: "1.25rem" }}
                              >
                                {cart?.find(
                                  (item) => item.menuItemId === data.menuItemId
                                )?.quantity || 0}
                              </span>
                              <button
                                className="btn btn-sm btn-success add-to-cart-btn"
                                onClick={() => addToCart(data)}
                                style={{ fontSize: "1.5rem" }}
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
                              className="btn text-light mt-4"
                              style={{
                                padding: "10px",
                                borderRadius: "8px",
                                width: "100%",
                                fontWeight: "750",
                                backgroundColor: "purple",
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
            ))
          : ""}

        {fetchLoading || restroLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8]?.map((index) => (
              <SkeletonItem key={index} />
            ))
          : null}
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
    </>
  );
}
