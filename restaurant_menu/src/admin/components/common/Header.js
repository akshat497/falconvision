import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaRegAddressBook,
  FaSignOutAlt,
  FaRegMoon,
  FaMoon,
  FaPlusCircle,
  FaImage,
  FaBell,
  FaSlidersH,
  FaSlideshare,
  FaKey,
  FaDivide,
  FaExpand,
  FaUser,
  FaQuestion,
  FaExclamation,
  FaCog,
  FaTable,
  FaHotel,
  FaRegChartBar,
  FaQrcode,
  FaEarlybirds,
  FaTicketAlt,
  FaBuilding,
  FaRegBuilding,
  FaGlobe,
  FaPuzzlePiece,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import RestaurantContext from "../../../context/RestaurantContext";
import PasswordResetModal from "../main/settings/modals/PasswordResetModal";
import UserProfile from "../main/settings/UserProfile";
import HelpModal from "../main/settings/modals/HelpModal";
import Feedback from "../main/settings/modals/Feedback";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    expanded,
    setExpanded,
    isDarkMode,
    setIsDarkMode,
    notification,
    setnotification,
    setFetcheditems,
    fetcheditems,
    fetcheditemsCopy,
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
  const [iconSize, seticonSize] = useState(20);
  const [display, setdisplay] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [passwordResetModalVisibel, setpasswordResetModalVisibel] =
    useState(false);
  const [SearchedText, setSearchedText] = useState("");
  const [searchDisplay, setsearchDisplay] = useState([]);
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
    switch (notification) {
      case "updatedMenu":
        return (
          <div>
            <b>Menu item is updated </b>
          </div>
        );

      case "neworder":
        return (
          <div>
            <b>Received a new order</b>
          </div>
        );

      case "newMenu":
        return (
          <div>
            <b>New menu item is added</b>
          </div>
        );
      case "userUpdated":
        return (
          <div>
            <b>Check your account status</b>
          </div>
        );
      default:
        return null;
    }
  };
  
  const handleMainHeaderSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchedText(searchText);

    const menuitems = fetcheditemsCopy?.filter((data) =>
      data?.name?.toLowerCase()?.includes(searchText)
    );

    const category = fetcheCategory?.filter((data) =>
      data?.name?.toLowerCase()?.includes(searchText)
    );

    const orders = allorders?.filter((data) =>
      data?.username?.toLowerCase()?.includes(searchText)
    );
    const coupens = couponCodes?.filter((data) =>
      data?.name?.toLowerCase()?.includes(searchText)
    );

    const filteredData = [
      ...menuitems?.map((item) => ({ ...item, type: "menu" })),
      ...category?.map((item) => ({ ...item, type: "category" })),
      ...orders?.map((item) => ({ ...item, type: "orders" })),
      ...coupens?.map((item) => ({ ...item, type: "coupon" })),
    ]; // Combine menuitems, category, and orders with type information

    setsearchDisplay(filteredData);

    // Set visibility of the dropdown based on the search text
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

  return (
    <>
      <PasswordResetModal />
      <UserProfile />
      <HelpModal />
      <Feedback />
      {/* <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Brand Name</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
         
           
        
          </ul>
          <form className="d-flex">
           
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_y99l-Op_mvXAHL9GBicTbVU8AyV9l6rxfQ&usqp=CAU" alt="DP" className="text-light profileImage" />
            <h4 className='text-light mx-3 my-2'>Username</h4>
          </form>
        </div>
      </div>
    </nav></div>
   <div>
<div>
  <div className="sidebar">
   
    <ul>
      <li><Link to="/admin/dashbord">Dashboard</Link></li>
      <li><Link href="#">Orders</Link></li>
      <li><Link href="#">Add Item</Link></li>
      <li><Link href="#">Settings</Link></li>
    </ul>
  </div>
 
</div>

   </div> */}
      {!restroLoading ? (
        <>
          <nav
            className={
              isDarkMode
                ? "navbar navbar-expand-lg navbar-dark bg-dark text-secondary "
                : "navbar navbar-expand-lg navbar-light bg-light"
            }
          >
            <span className="navbar-toggler-icon " onClick={toggleSidebar} />
            <div className="container-fluid">
              <a className="navbar-brand mx-2 fs-4" href="#">
                <FaEarlybirds size={40} />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {/* ... other JSX code ... */}
                 <div 
                  style={{
                      marginLeft: "50%",
                      width: "55vw",
                      borderRadius: "30px",
                    }}>
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
                            <span className="type-indicator">{data?.type}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                 </div>
                  {/* ... other JSX code ... */}
                </ul>

                <div className="btn-group dropstart ">
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
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <button
                      className="dropdown-item"
                      onMouseEnter={handleGearClick}
                      onClick={() => {
                        setpasswordResetModalVisibel(
                          !passwordResetModalVisibel
                        );
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#passwordResetModal"
                    >
                      {" "}
                      <FaKey /> Reset Password
                    </button>
                    <button
                      className="dropdown-item"
                      onMouseEnter={handleGearClick}
                      data-bs-toggle="modal"
                      data-bs-target="#userProfileModal"
                    >
                      <FaUser /> Profile
                    </button>
                    <button
                      className="dropdown-item"
                      onMouseEnter={handleGearClick}
                      data-bs-toggle="modal"
                      data-bs-target="#helpmodal"
                    >
                      <FaQuestion /> Help
                    </button>
                    <button
                      className="dropdown-item"
                      onMouseEnter={handleGearClick}
                      data-bs-toggle="modal"
                      data-bs-target="#Feedback"
                    >
                      <FaExclamation /> Feedback
                    </button>
                    <button
                      className="dropdown-item"
                      disabled
                    >
                      <FaRegBuilding />  Franchise
                    </button>

                    <a>
                      <hr className="dropdown-divider" />
                    </a>
                    <button className="dropdown-item" href="#" onClick={logOut}>
                      <FaSignOutAlt /> Log Out
                    </button>
                  </div>
                </div>

                <form className="d-flex">
                  <div className="notification-center dropstart">
                    <FaBell
                      size={25}
                      className="mt-2 mr-2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <span
                      className="badge text-danger"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        padding: " 5px 10px",
                        borderRadius: "50%",

                        color: "#fff",
                        fontSize: "12px",
                      }}
                    >
                      <b>
                        {notification.length > 0 ? notification.length : ""}
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
                        width: "300px",
                      }}
                    >
                      {/* Your list items go here */}

                      {notification.length === 0 ? (
                        <li>
                          <button className="dropdown-item" type="button">
                            <div>Notification will appear here</div>
                          </button>
                        </li>
                      ) : (
                        notification?.map((notification, index) => (
                          <li key={index}>
                            <b> {notification}</b>
                          </li>
                        ))
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
                </form>
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
                    ? "menu-items content my-5 ml-4"
                    : "menu-items content my-5 "
                }
              >
                <ul className="nav-links">
                  <li>
                    <Link to="/admin/">
                      <span
                        className="link-name "
                        style={{
                          color: pathname === "/admin/" ? "purple" : "",
                        }}
                      >
                        <FaRegChartBar size={`${iconSize}`} />{" "}
                        <span className={`d-${display}`}>Dashboard</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/add">
                      <span
                        className="link-name"
                        style={{
                          color: pathname === "/admin/add" ? "purple" : "",
                        }}
                      >
                        <FaPlusCircle size={`${iconSize}`} />
                        <span className={`d-${display}`}> Add</span>
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/tables">
                      <span
                        className="link-name"
                        style={{
                          color: pathname === "/admin/tables" ? "purple" : "",
                        }}
                      >
                        <FaTable size={`${iconSize}`} />
                        <span className={`d-${display}`}> Tables</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/ordermanagement">
                      <span
                        className="link-name"
                        style={{
                          color:
                            pathname === "/admin/ordermanagement"
                              ? "purple"
                              : "",
                        }}
                      >
                        <FaRegAddressBook size={`${iconSize}`} />
                        <span className={`d-${display}`}> Orders</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/preview">
                      <span
                        className="link-name"
                        style={{
                          color: pathname === "/admin/preview" ? "purple" : "",
                        }}
                      >
                        <FaImage size={`${iconSize}`} />
                        <span className={`d-${display}`}> Preview</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/qr">
                      <span
                        className="link-name"
                        style={{
                          color: pathname === "/admin/qr" ? "purple" : "",
                        }}
                      >
                        <FaQrcode size={`${iconSize}`} />
                        <span className={`d-${display}`}> QR</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/coupon">
                      <span
                        className="link-name"
                        style={{
                          color: pathname === "/admin/coupon" ? "purple" : "",
                        }}
                      >
                        <FaTicketAlt size={`${iconSize}`} />
                        <span className={`d-${display}`}> coupon</span>
                      </span>
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
