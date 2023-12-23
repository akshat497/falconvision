import React, { useEffect, useState } from "react";
import {
  FaRupeeSign,
  FaPlus,
  FaMinus,
  FaTrash,
  FaPlusCircle,

} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { applyCoupon } from "../redux/coupon/couponCodeThunk";
const CartPage = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [coupenDisplay, setcoupenDisplay] = useState(false);
  const discountedAmount = useSelector((state) => state.couponcodes.couponcode);
  const applyingCoupon = useSelector((state) => state.couponcodes.couponcodeloading);
  const fetchedItem = useSelector((state) => state.fetchitem.f_item);
  const fetchedCategory = useSelector((state) => state.fetchcategory.fetchedcategory);

  
  
  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
   

      // Find and remove the item with the given id from the cart
      const updatedCart = storedCart.filter((item) => item?.isActive===true);

      // Update the local storage with the modified cart data
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    updateTotalPrice(updatedCart);
  }, [fetchedItem,fetchedCategory]);

  useEffect(() => {
    
    if (discountedAmount !== null&&cart&&cart.length!==0) {
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
      items:JSON.parse(localStorage.getItem("cart"))
    };
    dispatch(applyCoupon(obj));
    
  };
 
  const handleDeleteFromCart = (id) => {
    // Find the product element to delete
    
    setDiscount(0)
    const productElement = document.getElementById(`product-${id}`);

    // Apply the fade-out effect
    productElement.classList.add("fade-out");

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
    }, 300); // Adjust the delay (300ms) to match your transition duration
  };

  return (
    <main className="container" style={{ backgroundColor: "whitesmoke" }}>
      <section className="shopping-cart">
        <h1 className="cart-heading">
          {cart.length < 1 ? "Add items in cart" : "Your Cart"}
        </h1>
        <div className="cart-container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                {cart?.length < 1 ? (
                  <div className="empty-cart-message">
                    <Link to={`/customer`}>
                      <div className="fs-2 text-center">
                        Start adding <FaPlusCircle />
                      </div>
                    </Link>
                  </div>
                ) : (
                  cart?.map((data) => (
                    <div
                      className={`product`}
                      id={`product-${data.menuItemId}`}
                      key={data.menuItemId}
                    >
                      <div className="row">
                        <div className="col-md-3 col-4">
                          <img
                            className="img-fluid mx-auto d-block image"
                            src={data?.imageUrl}
                            alt={data?.name}
                          />
                        </div>
                        <div className="col-md-9 col-8">
                          <div className="info">
                          
                            <div className="product-name">
                            
                              <div className="name">
                              {data?.name}
                              <small className={data?.veg ? "badge bg-success mx-2 " : "badge bg-danger mx-2"} style={{ fontSize: "0.7rem",}}>
          {data?.veg ? "veg" : "nonveg"}
        </small></div>
                              <div className="product-info">
                                <div className="price-info">
                                  Price:{" "}
                                  <span className="">
                                    <FaRupeeSign />
                                    {data?.price * data?.quantity}
                                  </span>
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
                                  setDiscount(0);
                                }}
                                disabled={data.quantity <= 1}
                              >
                                <FaMinus />
                              </button>
                              <span
                                className="quantity-value"
                                id={`quantity-${data.id}`}
                              >
                                {data?.quantity}
                              </span>
                              <button
                                className="btn btn-success p-1"
                                onClick={() => {
                                  handleQuantityChange(
                                    data.menuItemId,
                                    data.quantity + 1
                                  );
                                  setDiscount(0);
                                }}
                              >
                                <FaPlus />
                              </button>
                            </div>
                            <div className="price">
                              {/* <span>Total:</span>
                            <span><FaRupeeSign/>{data?.price * data?.quantity}</span> */}
                              <span
                                className="delete-icon"
                                onClick={() =>
                                  handleDeleteFromCart(data.menuItemId)
                                }
                              >
                                <FaTrash />
                              </span>
                            </div>
                          </div>
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
                      {applyingCoupon?"Applying..":"Apply"}
                        
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
                <Link to="/checkoutpage">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block checkout-button"
                  >
                    Checkout
                  </button>
                </Link>
                <Link to={`/customer`}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg btn-block continue-shopping-button"
                  >
                    Continue Shopping
                  </button>
                </Link>
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
