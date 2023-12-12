import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";

import {
  FaCheck,
  FaCheckCircle,
  FaCheckDouble,
  FaRegCheckCircle,
  FaRupeeSign,
  FaTicketAlt,
} from "react-icons/fa";

import "react-loading-skeleton/dist/skeleton.css";
import { updateIsActiveOrder } from "../../../redux/orders/orderThunk";
import NoDatComponent from "../../../components/common/NoDatComponent";

// import { w3cwebsocket } from 'websocket';

const OrderManagement = ({ ordersCopy, searchText, handleSearch }) => {
  const dispatch = useDispatch();

  // const allorders = useSelector((state) => state.getOrder.order);
  const allordersLoading = useSelector((state) => state.getOrder.loading);

  // const isActiveUpdate=useSelector((state)=> state.updateisactiveorder.isActiveOrder)

  // useEffect(()=>{if(isUpdated!==null){setseen(true)}},[isUpdated])

  const columns = [
    {
      name: "Customer Name",
      selector: "username",
      sortable: true,
    },
    {
      name: "Table-number",
      selector: "tableNumber",
      sortable: true,
    },
    {
      name: "Phone-number",
      selector: "phoneNumber",
      sortable: true,
    },
    {
      name: "Status",
      selector: "isActive",
      cell: (row) => (
        <div>
          {/* <ReactSwitch
         checked={row.Orders[0]?.isActive}
        /> */}
          <span>
            <b>
              {row.Orders[0]?.isActive ? (
                <div className="badge bg-info">New </div>
              ) : row.Orders[0]?.isRejected ? (
                <div className="badge bg-danger">Rejected </div>
              ) : row.Orders[0]?.isCompleted ? (
                <div className="badge bg-success">Completed </div>
              ) : (
                ""
              )}
            </b>
          </span>
        </div>
      ),
    },

    {
      name: "",
      cell: (row) => (
        <div className="d-flex  " style={{ marginLeft: "-30%" }}>
          <>
            {row.Orders[0]?.isActive ? (
              <button
                className="btn btn-sm btn-success"
                disabled={row.Orders[0]?.isAccepted === true}
                onClick={() => {
                  sendNotifucation(row);
                }}
              >
                {row.Orders[0]?.isAccepted === true ? (
                  <FaCheckCircle size={30} color="white" />
                ) : (
                  "Accept"
                )}
              </button>
            ) : (
              ""
            )}

            <button
              onDoubleClick={() => rejectOrder(row)}
              className={
                row.Orders[0]?.isActive
                  ? "btn btn-sm btn-danger mx-2 "
                  : "btn sm btn-danger mx-2 d-none"
              }
            >
              Reject{" "}
            </button>
            <button
              onClick={() => completedOrder(row)}
              className={
                row.Orders[0]?.isActive
                  ? "btn btn-info btn-sm  mr-3"
                  : "btn btn-info mr-3 d-none"
              }
            >
              complete
            </button>
          </>
        </div>
      ),
    },
  ];
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
      isAccepted: row?.Orders[0]?.isAccepted,
      orderId: row?.Orders[0]?.orderId,
      customerId: row?.Orders[0]?.customerId,
      userId: row?.userId,
    };

    dispatch(updateIsActiveOrder(obj));
  };

  const completedOrder = (row) => {
    // Implement logic to send a notification to the client
    var obj = {
      totalamount: row?.Orders[0]?.totalAmount,
      isActive: false,
      isRejected: row?.Orders[0]?.isRejected,
      isCompleted: true,
      isAccepted: row?.Orders[0]?.isAccepted,
      orderId: row?.Orders[0]?.orderId,
      customerId: row?.Orders[0]?.customerId,
      userId: row?.userId,
    };

    dispatch(updateIsActiveOrder(obj));
  };

  //  useEffect(()=>{
  //   if(isActiveUpdate?.isActive===true){
  //     setstatus(false)
  //   }
  //  },[isActiveUpdate])

  const expandableRow = (row) => {
    // var obj = {
    //   totalamount: row?.data?.Orders[0]?.totalAmount,
    //   isActive: false,
    //   orderId: row?.data?.Orders[0]?.orderId,
    // };
    // if (row?.data?.Orders[0]?.isActive === true) {
    //   dispatch(updateIsActiveOrder(obj));
    //   setseen(true)
    //   // row.data.Orders[0].isActive = false

    // }

    if (row.data && row.data.Orders) {
      const orderItems = row.data.Orders.flatMap((order) => order.OrderItems);

      const columns = [
        {
          name: "Name",
          selector: "item_name",
          sortable: true,
        },
        {
          name: "Price",
          selector: "price",
          sortable: true,
        },
        {
          name: "Quantity",
          selector: "quantity",
          sortable: true,
        },
        {
          name: "total",
          selector: (row) => row.quantity * row.price,
          sortable: true,
        },
      ];

      return (
        <>
          <DataTable
            columns={columns}
            data={orderItems}
            noHeader
            dense
            striped
            highlightOnHover
          />
          <table>
            <tbody>
              <thead></thead>
              <tr>
                <td>
                  <h3>Total</h3>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <FaRupeeSign /> {row.data.Orders[0].totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      );
    } else {
      return <div>No items found.</div>;
    }
  };

  const CustomTableSkeleton = () => {
    return (
      <div className="youtube-skeleton-loader my-5">
        <div className="youtube-skeleton-header">
          <div className="youtube-skeleton-shimmer"></div>
          <div className="youtube-skeleton-shimmer"></div>
          <div className="youtube-skeleton-shimmer"></div>
          {/* Add more shimmer elements for additional columns */}
        </div>
        <div className="youtube-skeleton-body">
          {[...Array(10)].map((_, index) => (
            <div className="youtube-skeleton-row" key={index}>
              <div className="youtube-skeleton-shimmer"></div>
              <div className="youtube-skeleton-shimmer"></div>
              <div className="youtube-skeleton-shimmer"></div>
              {/* Add more shimmer elements for additional columns */}
            </div>
          ))}
        </div>
      </div>
    );
  }; // Number of rows to display as placeholders

  return (
    <>
      <div className="container-fluid my-3">
        <input
          type="text"
          placeholder="Search by Name..."
          className="form-control"
          value={searchText} // Bind the input value to the searchText state
          onChange={handleSearch} // Call handleSearch function on input change
        />
      </div>
      <div>
        {ordersCopy.length === 0 || ordersCopy === null ? (
          <NoDatComponent />
        ) : (
          <>
            {!allordersLoading ? (
              <DataTable
                columns={columns}
                data={ordersCopy} // Use the filtered orders here
                expandableRows
                highlightOnHover
                expandableRowsComponent={expandableRow}
              />
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default OrderManagement;
