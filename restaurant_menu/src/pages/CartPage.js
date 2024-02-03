import React, { useEffect, useState } from "react";
import {
  FaRupeeSign,
  FaPlus,
  FaMinus,
  FaTrash,
  FaPlusCircle,
  FaRegDotCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { applyCoupon } from "../redux/coupon/couponCodeThunk";
import { fetchItem } from "../redux/items/itemThunk";
import { waiterCall } from "../redux/users/userthunk";
const CartPage = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [coupenDisplay, setcoupenDisplay] = useState(false);
  const discountedAmount = useSelector((state) => state.couponcodes.couponcode);
  const applyingCoupon = useSelector(
    (state) => state.couponcodes.couponcodeloading
  );
  const fetchedItem = useSelector((state) => state.fetchitem.f_item);
  const fetchedCategory = useSelector(
    (state) => state.fetchcategory.fetchedcategory
  );
  const localStorageKey = 'waiterCallTimestamp';
  const [isWaiterCallDisabled, setIsWaiterCallDisabled] = useState(false);
  const waiterCallResponse = useSelector(
    (state) => state.waiterCall.callwaiter
  );
  useEffect(()=>{
    if(waiterCallResponse?.success===true){
      const lastClickTimestamp = localStorage.getItem(localStorageKey);
      const currentTime = new Date().getTime();
  
      if (!lastClickTimestamp || currentTime - lastClickTimestamp > 60000) {
        // Perform your waiter call logic here
  
        // Disable the button
        setIsWaiterCallDisabled(true);
  
        // Save the current timestamp in localStorage
        localStorage.setItem(localStorageKey, currentTime);
  
        // Enable the button after 1 minute (60,000 milliseconds)
        setTimeout(() => {
          setIsWaiterCallDisabled(false);
        }, 60000);
      }
    }
  },[waiterCallResponse])
  const callWaiter = () => {
    // Check if the button was clicked within the last minute
     const params = JSON.parse(localStorage.getItem("params"));
    let obj={
      userId:params.userId,
      tableNumber:Number(params.tableNumber)
    }
    dispatch(waiterCall(obj))
    
  };

  useEffect(() => {
    // Check if the button should be disabled on component mount
    const lastClickTimestamp = localStorage.getItem(localStorageKey);
    const currentTime = new Date().getTime();

    if (lastClickTimestamp && currentTime - lastClickTimestamp <= 60000) {
      setIsWaiterCallDisabled(true);

      // Enable the button after the remaining time
      setTimeout(() => {
        setIsWaiterCallDisabled(false);
      }, 60000 - (currentTime - lastClickTimestamp));
    }
  }, []);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Find and remove the item with the given id from the cart
    const updatedCart = storedCart.filter((item) => item?.isActive === true);

    // Update the local storage with the modified cart data
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  }, [fetchedItem, fetchedCategory]);

  useEffect(() => {
    if (discountedAmount !== null && cart && cart.length !== 0) {
      setDiscount(discountedAmount?.discountedAmount);
    }
  }, [discountedAmount]);
  const handleQuantityChange = (itemId, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);

    const updatedCart = cart.map((item) =>
      item.menuItemId === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    updateTotalPrice(updatedCart);
    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateTotalPrice = (cartItems) => {
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };
  const handleApplyCoupon = () => {
    const params = JSON.parse(localStorage.getItem("params"));
    const obj = {
      name: couponCode,
      userId: params?.userId,
      totalAmount: totalPrice,
      items: JSON.parse(localStorage.getItem("cart")),
    };
    dispatch(applyCoupon(obj));
  };

  const handleDeleteFromCart = (id) => {
    // Find the product element to delete
    //  debugger;
    setDiscount(0);
    // const productElement = document.getElementById(`product-${id}`);

    // Apply the fade-out effect
    // productElement.classList.add("fade-out");

    // Delay the actual removal after the animation
    setTimeout(() => {
      // Get the current cart data from local storage
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Find and remove the item with the given id from the cart
      const updatedCart = currentCart.filter((item) => item.menuItemId !== id);

      // Update the local storage with the modified cart data
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Remove the item from the cart state
      setCart(updatedCart);
      updateTotalPrice(updatedCart);
    }, 0); // Adjust the delay (300ms) to match your transition duration
  };

  useEffect(() => {
    const params = JSON.parse(localStorage.getItem("params"));
    dispatch(fetchItem(params?.userId));
    if (fetchedItem !== null) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      function updateCartWithAvailableItems() {
        cart = cart.filter((cartItem) =>
          fetchedItem.some(
            (menuItem) => menuItem.menuItemId === cartItem.menuItemId
          )
        );
        saveCartToLocalStorage();
      }
      function saveCartToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      updateCartWithAvailableItems();
    }
  }, []);
 
  return (
    <main className="container" style={{ backgroundColor: "whitesmoke" }}>
      <section className="shopping-cart">
        <h1 className="cart-heading">
          {cart?.length < 1 ? "Add items in cart" : "Your Cart"}
        </h1>
        <div className="cart-container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                {cart?.length < 1 ? (
                  <div className="empty-cart-message">
                    <Link to={`/customer`}>
                      <div className="fs-2">
                        Start adding <FaPlusCircle />
                      </div>
                    </Link>
                  </div>
                ) : (
                  cart?.map((data, index) => (
                    <div className={`product`} key={index}>
                      <div className="Cartrow">
                        <div className="">
                          <img
                            className="img-fluid mx-auto d-block image"
                            src={
                              process.env.REACT_APP_BASE_URL_FOR_IMAGES +
                              data?.imageUrl
                            }
                            alt={data?.name}
                          />
                        </div>
                        <div className="product-details">
                          <div className="product-name">
                            <div className="card-title">
                              <div className="text-center">
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
                              </div>
                            </div>
                            <div className="product-info">
                              <div className="price-info">
                                Price:{" "}
                                <span className="price">
                                  <FaRupeeSign />
                                  {data?.price * data?.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="quantity-input">
                          <button
                            className="btn btn-danger my-3 p-1"
                            onClick={() => {
                              handleQuantityChange(
                                data.menuItemId,
                                data.quantity - 1
                              );
                            }}
                            disabled={data.quantity <= 1}
                          >
                            <FaMinus />
                          </button>
                          <span className="quantity-value">
                            {data?.quantity}
                          </span>
                          <button
                            className="btn btn-success p-1"
                            onClick={() => {
                              handleQuantityChange(
                                data.menuItemId,
                                data.quantity + 1
                              );
                            }}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      <div className="symboles">
                        <div className="veg-icon">
                          {data?.veg ? (
                            <FaRegDotCircle className="text-success" />
                          ) : (
                            <FaRegDotCircle className="text-danger" />
                          )}
                        </div>
                        <div className="delete-icon">
                          <span
                            onClick={() =>
                              handleDeleteFromCart(data?.menuItemId)
                            }
                          >
                            <FaTrash />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <h3>Order Summary</h3>
                <div className="summary-item">
                  <span className="text">Subtotal</span>
                  <span className="price">
                    <FaRupeeSign />
                    {totalPrice}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="text">Discount</span>

                  <span className="price discount-price">
                    <FaRupeeSign />
                    {discount}
                  </span>
                </div>
                <div className="">
                  <span
                    className="text"
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setcoupenDisplay(true);
                    }}
                  >
                    Have a coupon?
                  </span>
                  {coupenDisplay && (
                    <div className="d-flex ">
                      <input
                        type="text"
                        placeholder="Enter Coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="form-control mt-2"
                        style={{ width: "50%", height: "40px" }}
                      />
                      <button
                        className="btn btn-danger my-2 ml-2"
                        onClick={handleApplyCoupon}
                        disabled={applyingCoupon}
                      >
                        {applyingCoupon ? "Applying.." : "Apply"}
                      </button>
                    </div>
                  )}
                </div>
                <div className="summary-item">
                  <span className="text">Total</span>
                  <span className="price total-price">
                    <FaRupeeSign />
                    {totalPrice - discount}
                  </span>
                </div>

                <div className="justify-content-center align-items-center">
                  <div className="text-center">
                    {cart?.length === 0 ? (
                      <button
                        type="button"
                        className=" checkout-button "
                        disabled={cart?.length === 0}
                        style={{opacity:"0.5"}}
                      >
                        Checkout
                      </button>
                    ) : (
                      <Link to="/checkoutpage">
                        <button
                          type="button"
                          className="checkout-button"
                          disabled={cart?.length === 0}
                        >
                          Checkout
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="text-center">
                   
                      <button
                        type="button"
                        className="checkout-button bg-info"
                        style={{
                          opacity:isWaiterCallDisabled===true?"0.5":"2",
                          cursor:isWaiterCallDisabled===true?"not-allowed":""
                          }}
                        onClick={callWaiter}
                        disabled={isWaiterCallDisabled}
                      >
                        Call Waiter
                      </button>
                 
                  </div>
                  <div className="text-center">
                    <Link to="/customer">
                      <button
                        type="button"
                        className="checkout-button bg-success"
                      >
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
// ... (previous code)

// ... (remaining code)
