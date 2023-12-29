import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaRegAddressBook,
  FaSignOutAlt,
  FaPlusCircle,
  FaImage,
  FaBell,
  FaKey,
  FaUser,
  FaQuestion,
  FaExclamation,
  FaCog,
  FaTable,
  FaRegChartBar,
  FaQrcode,
  FaEarlybirds,
  FaTicketAlt,
  FaRegBuilding,
  FaClipboardList,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import RestaurantContext from "../../../context/RestaurantContext";
import PasswordResetModal from "../main/settings/modals/PasswordResetModal";
import UserProfile from "../main/settings/UserProfile";
import HelpModal from "../main/settings/modals/HelpModal";
import Feedback from "../main/settings/modals/Feedback";
import { updateIsActiveOrder } from "../../../redux/orders/orderThunk";
import NotificationBell from "../../../images/Notification-Bell.png";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updatedOrder = useSelector(
    (state) => state.updateisactiveorder.isActiveOrder
  );

  const { pathname } = useLocation();

  const {
    expanded,
    setExpanded,
    isDarkMode,
    setIsDarkMode,

    fetcheditemsCopy,
    orders,
  } = useContext(RestaurantContext);
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const fetcheCategory = useSelector(
    (state) => state.fetchcategory.fetchedcategory
  );

  const restroLoading = useSelector((state) => state.restrodetail.loading);
  const allorders = useSelector((state) => state.getOrder.order);
  const couponCodes = useSelector((state) => state.getCoupon.getCoupon);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [restroData, setrestroData] = useState({});
  const [iconSize, seticonSize] = useState(24);
  const [display, setdisplay] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [passwordResetModalVisibel, setpasswordResetModalVisibel] =
    useState(false);
  const [SearchedText, setSearchedText] = useState("");
  const [searchDisplay, setsearchDisplay] = useState([]);
  const [notificationLengthState, setnotificationLengthState] = useState(0);
  const handleGearClick = () => {
    setIsRotated(!isRotated); // Toggle isRotated between true and false
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
    if (display === "") {
      setdisplay("none");
      seticonSize(32);
    } else {
      setdisplay("");
      seticonSize(20);
    }
  };

  // Load mode and status from localStorage on component mount
  useEffect(() => {
    const getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark") {
      setIsDarkMode(true);
    }

    const getStatus = localStorage.getItem("status");
    if (getStatus && getStatus === "close") {
      setIsSidebarClosed(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = (e) => {
    setIsDarkMode(!isDarkMode);
    // Update localStorage

    localStorage.setItem("mode", isDarkMode ? "light" : "dark");
  };
  useEffect(() => {
    if (isDarkMode) {
      document.getElementById("root").className = "bg-dark";
    } else {
      document.getElementById("root").className = "bg-light";
    }
  }, [isDarkMode]);
  // Toggle sidebar status
  // const toggleSidebar = () => {
  //   setIsSidebarClosed(!isSidebarClosed);
  //   // Update localStorage
  //   localStorage.setItem("status", isSidebarClosed ? "open" : "close");
  // };

  //  useEffect(()=>{
  //   dispatch(fetchRestraurantDetails())
  // },[])

  useEffect(() => {
    setrestroData(restroDetails);
  }, [restroDetails]);

  const HeaderSkeleton = () => {
    return (
      <nav className="header-skeleton">
        <div className="logo-name">
          <div className="logo-image skeleton"></div>
          <div className="skeleton logo-text"></div>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li>
              <span className="skeleton link"></span>
            </li>
            <li>
              <span className="skeleton link"></span>
            </li>
            <li>
              <span className="skeleton link"></span>
            </li>
            <li>
              <span className="skeleton link"></span>
            </li>
            <li>
              <span className="skeleton link"></span>
            </li>
          </ul>
          <ul className="logout-mode">
            <li>
              <span className="skeleton link"></span>
            </li>
            <li className="mode">
              <span className="skeleton link"></span>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleNotification = (notification) => {
    switch (notification.updateType) {
      case "updatedOrder":
        break;
      case "newOrder":
        break;
      default:
        return (
          <>
            {notification?.Orders[0]?.isActive === true && (
              <div
                className="notification-container"
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="notification-content"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="icon-col" style={{ marginRight: "10px" }}>
                    <FaClipboardList size={30} />
                  </div>
                  <div className="order-info-col">
                    Received a new order from table number{" "}
                    <b>{notification?.tableNumber}</b>
                  </div>
                  <div
                    className="action-buttons col-md-3"
                    style={{ marginLeft: "auto", display: "flex" }}
                  >
                    {notification?.Orders[0]?.isAccepted === false && (
                      <div className="mx-1 my-1" style={{ cursor: "pointer" }}>
                        <FaCheckCircle
                          color="#4CAF50"
                          size={24}
                          onClick={() => {
                            sendNotifucation(notification);
                          }}
                        />
                      </div>
                    )}

                    {notification?.Orders[0]?.isRejected === false && (
                      <div className="mx-1 my-1" style={{ cursor: "pointer" }}>
                        <FaTimesCircle
                          color="#FF0000"
                          size={24}
                          onClick={() => {
                            rejectOrder(notification);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <small>
                  <b>Time</b>:{" "}
                  {new Date(notification?.createdAt).toLocaleString()}
                </small>
              </div>
            )}
          </>
        );
    }
  };

  const sendNotifucation = (row) => {
    var obj = {
      totalamount: row?.Orders[0]?.totalAmount,
      isActive: row?.Orders[0]?.isActive,
      isRejected: row?.Orders[0]?.isRejected,
      isCompleted: row?.Orders[0]?.isCompleted,
      isAccepted: true,
      orderId: row?.Orders[0]?.orderId,
      customerId: row?.Orders[0]?.customerId,
      userId: row?.userId,
    };

    dispatch(updateIsActiveOrder(obj));
  };
  const rejectOrder = (row) => {
    // Implement logic to reject an order

    var obj = {
      totalamount: row?.Orders[0]?.totalAmount,
      isActive: false,
      isRejected: true,
      isCompleted: row?.Orders[0]?.isCompleted,
      isAccepted: false,
      orderId: row?.Orders[0]?.orderId,
      customerId: row?.Orders[0]?.customerId,
      userId: row?.userId,
    };

    dispatch(updateIsActiveOrder(obj));
  };

  const handleMainHeaderSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchedText(searchText);

    const searchInArray = (data, type) => {
      return data
        .filter((item) => {
          // Check if any property of the item includes the search text
          const itemValues = Object.values(item).map((value) =>
            value?.toString().toLowerCase()
          );
          return itemValues.some(
            (value) => value && value.includes(searchText)
          );
        })
        .map((item) => ({ ...item, type }));
    };

    const filteredData = [
      ...searchInArray(allorders, "orders"),
      ...searchInArray(couponCodes, "coupon"),
      ...searchInArray(fetcheditemsCopy, "menu"),
      ...searchInArray(fetcheCategory, "category"),
    ];

    setsearchDisplay(filteredData);
    setShowSearchDropdown(searchText.length > 0);
  };

  const handleResultClick = (item) => {
    // Check the type of the item and navigate accordingly

    switch (item?.type) {
      case "menu":
        navigate("/admin/tables", { state: { item } });

        break;
      case "category":
        navigate("/admin/tables", { state: { item } }); // You can change this to the appropriate category route
        break;
      case "orders":
        navigate("/admin/ordermanagement", { state: { item } });
        break;
      case "coupon":
        navigate("/admin/tables", { state: { item } });
        break;
      // Add more cases for other types if needed
      default:
        // Handle unknown type
        break;
    }
    setShowSearchDropdown(false);
    setSearchedText("");
  };
  const calculateNotificationLength = () => {
    if (orders.length > 0) {
      const notificationLength = orders.reduce(
        (total, data) =>
          total +
          data.Orders.filter((filteredData) => filteredData?.isActive).length,
        0
      );
      setnotificationLengthState(notificationLength);
    } else {
      setnotificationLengthState(0);
    }
  };

  useEffect(() => {
    calculateNotificationLength();
  }, [orders]);

  return (
    <>
      <PasswordResetModal />
      <UserProfile />
      <HelpModal />
      <Feedback />

      {!restroLoading ? (
        <>
          <nav
            className={
              isDarkMode
                ? "navbar navbar-expand-lg navbar-dark bg-dark text-secondary "
                : "navbar navbar-expand-lg navbar-light bg-light"
            }
          >
            <span
              className="navbar-toggler-icon "
              onClick={toggleSidebar}
              style={{ cursor: "pointer" }}
            />
            <div className="container-fluid">
            {/* <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button> */}
               
              
             
             
              <div
                className="collapse navbar-collapse "
                id="navbarSupportedContent"
                style={{justifyContent:"space-between",display:"flex"}}
              >
               <div>
                <FaEarlybirds size={40} />
                </div>
                <div className="">
                  {/* ... other JSX code ... */}
                  <div
                    style={{
                      borderRadius: "30px",
                      width:"40vw"
                    }}
                  >
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                      style={{
                        borderRadius: "30px",
                      }}
                      onChange={handleMainHeaderSearch}
                      value={SearchedText}
                      disabled={restroDetails?.isActive === false}
                    />
                    {showSearchDropdown && (
                      <div className="search-dropdown">
                        {searchDisplay?.map((data, index) => (
                          <button
                            className="dropdown-item"
                            key={index}
                            onClick={() => handleResultClick(data)}
                          >
                            <div className="search-result">
                              <span>{data?.name || data?.username}</span>
                              <span className="type-indicator">
                                {data?.type}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* ... other JSX code ... */}
                </div>

               

                <div className="d-flex">
                <div className=" nav-item dropdown">
                  <FaCog
                    className={`dropdown-toggle gear-icon mx-3 my-2 ${
                      isRotated ? "clockwise" : "anticlockwise"
                    }`}
                    size={25}
                    data-toggle="dropdown"
                    aria-expanded="true"
                    onMouseEnter={handleGearClick}
                  />

                  <div
                    className="dropdown-menu "
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="d-flex my-2 ">
                      <div className="col-md-1">
                        <FaUser />
                      </div>

                      <div className="col-md-12 text">
                        <button
                          className="dropdown-setting"
                          onMouseEnter={handleGearClick}
                          data-bs-toggle="modal"
                          data-bs-target="#userProfileModal"
                        >
                          Profile
                        </button>
                      </div>
                    </div>
                    <div className="d-flex my-2 ">
                      <div className="col-md-1">
                        <FaQuestion />
                      </div>

                      <div className="col-md-12 text">
                        <button
                          className="dropdown-setting"
                          onMouseEnter={handleGearClick}
                          data-bs-toggle="modal"
                          data-bs-target="#helpmodal"
                        >
                          Help
                        </button>
                      </div>
                    </div>
                    <div className="d-flex my-2 ">
                      <div className="col-md-1">
                        <FaExclamation />
                      </div>

                      <div className="col-md-12 text">
                        <button
                          className="dropdown-setting"
                          onMouseEnter={handleGearClick}
                          data-bs-toggle="modal"
                          data-bs-target="#Feedback"
                        >
                          Feedback
                        </button>
                      </div>
                    </div>
                    <div className="d-flex my-2 ">
                      <div className="col-md-1">
                        <FaRegBuilding />
                      </div>

                      <div className="col-md-12 text">
                        <button className="dropdown-setting" disabled>
                          Franchise
                        </button>
                      </div>
                    </div>
                    <div className="d-flex my-2  ">
                      <div className="col-md-1">
                        <FaKey />
                      </div>

                      <div className="col-md-12 text">
                        <button
                          className="dropdown-setting"
                          onMouseEnter={handleGearClick}
                          onClick={() => {
                            setpasswordResetModalVisibel(
                              !passwordResetModalVisibel
                            );
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#passwordResetModal"
                        >
                          Reset Password
                        </button>
                      </div>
                    </div>

                    <a>
                      <hr className="dropdown-divider" />
                    </a>
                    <div className="d-flex my-2 ">
                      <div className="col-md-1">
                        <FaSignOutAlt />
                      </div>

                      <div className="col-md-12 text">
                        <button
                          className="dropdown-setting"
                          href="#"
                          onClick={logOut}
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="notification-center dropstart">
                    <FaBell
                      size={25}
                      className="mt-2 mr-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <span
                      className={
                        notificationLengthState === 0
                          ? `badge d-none`
                          : `badge `
                      }
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "2px",
                        borderRadius: "100%",
                        color: "white",
                        fontSize: "12px",
                        backgroundColor: "purple",
                      }}
                    >
                      <b>
                        {notificationLengthState === 0
                          ? ""
                          : notificationLengthState}
                      </b>
                    </span>

                    <ul
                      className="dropdown-menu notification-dropdown"
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        zIndex: 1,
                        maxHeight: "300px",
                        overflowY: "auto",
                        border: "1px solid #ddd",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                        maxWidth: "350px",
                      }}
                    >
                      {/* Your list items go here */}

                      {Array.isArray(orders) && orders.length > 0 ? (
                        orders.some(
                          (order) => order?.Orders?.[0]?.isActive === true
                        ) ? (
                          orders.map((order, index) => (
                            <div className="" type="">
                              {handleNotification(order)}
                            </div>
                          ))
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <div
                                className=""
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={NotificationBell}
                                  height={200}
                                  width={200}
                                  alt="Notification-Bell"
                                />
                              </div>
                              <div >
                                Notifications will appear here
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div>
                              <div
                                className=""
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={NotificationBell}
                                  height={200}
                                  width={200}
                                  alt="Notification-Bell"
                                />
                              </div>
                              <div >
                                Notifications will appear here
                              </div>
                            </div>
                          
                      )}
                    </ul>
                  </div>

                  <div
                    className="logo-image ml-4"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-bs-title="Tooltip on top"
                  >
                    <img
                      src="data:image/png;base64,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"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
         
            </div>
          </nav>
          <div>
            <nav
              className={`my-5 bg-${isDarkMode ? "dark" : ""}  nav  sidebar ${
                expanded ? "expanded" : "collapsed "
              } `}
            >
              <div
                className={
                  expanded
                    ? "menu-items content my-5 "
                    : "menu-items content my-5 "
                }
              >
                <ul className="nav-links">
                  <li>
                    <Link to="/admin/">
                      <div className="d-flex">
                        <div className="col-md-1">
                          <FaRegChartBar
                            size={`${iconSize}`}
                            className="link-name "
                            style={{
                              color: pathname === "/admin/" ? "purple" : "",
                            }}
                          />{" "}
                        </div>
                        <div className="col-md-10">
                          <span
                            className="link-name "
                            style={{
                              color: pathname === "/admin/" ? "purple" : "",
                            }}
                          >
                            <span className={`d-${display}`}>Charts</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/add">
                      <div className="d-flex">
                        <div className="col-md-1">
                          <FaPlusCircle
                            size={`${iconSize}`}
                            style={{
                              color: pathname === "/admin/add" ? "purple" : "",
                            }}
                            className="link-name"
                          />
                        </div>
                        <div className="col-md-10">
                          <span
                            className="link-name"
                            style={{
                              color: pathname === "/admin/add" ? "purple" : "",
                            }}
                          >
                            <span className={`d-${display}`}> Add</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/tables">
                      <div className="d-flex">
                        <div className="col-md-1">
                          <FaTable
                            size={`${iconSize}`}
                            className="link-name"
                            style={{
                              color:
                                pathname === "/admin/tables" ? "purple" : "",
                            }}
                          />
                        </div>
                        <div className="col-md-10">
                          <span
                            className="link-name"
                            style={{
                              color:
                                pathname === "/admin/tables" ? "purple" : "",
                            }}
                          >
                            <span className={`d-${display}`}> Tables</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/ordermanagement">
                      <div className="d-flex">
                        <div className="col-md-1">
                          <FaRegAddressBook
                            size={`${iconSize}`}
                            className="link-name"
                            style={{
                              color:
                                pathname === "/admin/ordermanagement"
                                  ? "purple"
                                  : "",
                            }}
                          />
                        </div>
                        <div className="col-md-10">
                          <span
                            className="link-name"
                            style={{
                              color:
                                pathname === "/admin/ordermanagement"
                                  ? "purple"
                                  : "",
                            }}
                          >
                            <span className={`d-${display}`}> Orders</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/preview">
                      <div className="d-flex">
                        <div className="col-md-1">
                          <FaImage
                            size={`${iconSize}`}
                            className="link-name"
                            style={{
                              color:
                                pathname === "/admin/preview" ? "purple" : "",
                            }}
                          />
                        </div>
                        <div className="col-md-10">
                          <span
                            className="link-name"
                            style={{
                              color:
                                pathname === "/admin/preview" ? "purple" : "",
                            }}
                          >
                            <span className={`d-${display}`}> Preview</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/qr">
                      <div className="d-flex">
                        <div className="col-md-1">
                          <FaQrcode
                            size={`${iconSize}`}
                            className="link-name"
                            style={{
                              color: pathname === "/admin/qr" ? "purple" : "",
                            }}
                          />
                        </div>
                        <div className="col-md-10">
                          <span
                            className="link-name"
                            style={{
                              color: pathname === "/admin/qr" ? "purple" : "",
                            }}
                          >
                            <span className={`d-${display}`}> QR</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/coupon">
                      <div className="d-flex">
                        <div className="col-md-1">
                          <FaTicketAlt
                            size={`${iconSize}`}
                            className="link-name"
                            style={{
                              color:
                                pathname === "/admin/coupon" ? "purple" : "",
                            }}
                          />
                        </div>
                        <div className="col-md-10">
                          <span
                            className="link-name"
                            style={{
                              color:
                                pathname === "/admin/coupon" ? "purple" : "",
                            }}
                          >
                            <span className={`d-${display}`}> coupon</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
                <ul className="logout-mode">
                  <li className="mode">
                    {/* <a href="#">
                      <span className={`link-name d-${display}`}>
                        {isDarkMode ? <FaRegMoon /> : <FaMoon />}
                        {isDarkMode ? " light Mode " : " dark mode "}{" "}
                      </span>
                    </a>
                    <div className="form-check form-switch ">
                      <input
                        className={`form-check-input ml-1 d-${display}`}
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onClick={toggleDarkMode}
                        checked={isDarkMode ? true : false}
                      />
                    </div> */}
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </>
      ) : (
        <HeaderSkeleton />
      )}
    </>
  );
}
