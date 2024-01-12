import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderManagement from "./OrderManagement";
import RestaurantContext from "../../../context/RestaurantContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { FaListAlt, FaRedo, FaRegLemon, FaSync, FaSyncAlt } from "react-icons/fa";
import { fetchOrders } from "../../../redux/orders/orderThunk";

export default function OrderManagementHolder() {
  const allordersLoading = useSelector((state) => state.getOrder.loading);
  const detailRestro = useSelector((state) => state.restrodetail.restro);
  const dispatch = useDispatch();
  const { expanded, orders } = useContext(RestaurantContext);
  const [activeFilter, setActiveFilter] = useState("new"); // Initially, "New Orders" is active
  const [ordersCopy, setOrdersCopy] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setpage] = useState(100);
  const location = useLocation();
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    setOrdersCopy(orders);
  }, [orders]);
  useEffect(() => {
    const data = location?.state?.item;

    if (data?.Orders[0]?.isActive === true) {
      setActiveFilter("new");
      // setSearchText(data?.username)
    }
    if (data?.Orders[0]?.isRejected === true) {
      setActiveFilter("rejected");
      // setSearchText(data?.username)
    }
    if (data?.Orders[0]?.isCompleted === true) {
      setActiveFilter("completed");
      // setSearchText(data?.username)
    }
  }, [location]);
  const filteredOrders = ordersCopy?.filter((data) => {
    if (activeFilter === "new" && data?.Orders[0]?.isActive === true) {
      return true;
    } else if (
      activeFilter === "rejected" &&
      data?.Orders[0]?.isRejected === true
    ) {
      return true;
    } else if (
      activeFilter === "completed" &&
      data?.Orders[0]?.isCompleted === true
    ) {
      return true;
    }
    return false;
  });

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);

    const filteredOrders = orders?.filter((order) => {
      return order?.username?.toLowerCase().includes(searchTerm);
    });

    setOrdersCopy(filteredOrders);
  };
  const fetchMoreData = () => {
    setpage(page + 100);
  };
  useEffect(() => {
    if (page > 100 &&page!==undefined) {
      const orderObj = {
        userId: detailRestro?.userId,
        page: page,
      };
      dispatch(fetchOrders(orderObj));
    }
  }, [page]);
  return (
    <div className={expanded ? "dashboard" : "dashboardcollapsed"}>
      
     <div className="d-flex ">
     <div className="container-fluid">
        <button
          onClick={() => handleFilterChange("new")}
          className={activeFilter === "new" ? "btn-active mr-2" : "btn mr-2"}
        >
          New Orders
        </button>
        <button
          onClick={() => handleFilterChange("rejected")}
          className={
            activeFilter === "rejected" ? "btn-active   mx-2" : "btn mx-2"
          }
          // style={{backgroundColor:activeFilter === 'rejected' ?"red":""}}
        >
          Rejected Orders
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          className={
            activeFilter === "completed" ? "btn-active mx-2" : "btn mx-2"
          }
        >
          Completed Orders
        </button>
      </div>
      <div onClick={() => dispatch(fetchOrders({userId:restroDetails?.userId,page:100}))} className="mr-4">
        <button className="btn btn-active" disabled={allordersLoading} style={{height:"50px",width:"100%"}}>{allordersLoading?"":<FaRedo size={15} title="undo" className="mx-2"/>}{allordersLoading?"Refreshing...": "Refresh"}</button>
      </div>
     </div>
      <OrderManagement
        ordersCopy={filteredOrders}
        searchText={searchText}
        handleSearch={handleSearch}
      />
      {ordersCopy?.length > 98 && (
        <div
          className="my-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <small>
            {allordersLoading ? null : (
              <FaSyncAlt
                onClick={fetchMoreData}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Tooltip on top"
              />
            )}
          </small>
        </div>
      )}
    </div>
  );
}
