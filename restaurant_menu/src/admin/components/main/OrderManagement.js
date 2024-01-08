import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";

import { FaArrowAltCircleDown, FaCheckCircle, FaRedo, FaRupeeSign } from "react-icons/fa";

import "react-loading-skeleton/dist/skeleton.css";
import { updateIsActiveOrder } from "../../../redux/orders/orderThunk";
import NoDatComponent from "../../../components/common/NoDatComponent";
import { useEffect } from "react";

// import { w3cwebsocket } from 'websocket';

const OrderManagement = ({ ordersCopy, searchText, handleSearch }) => {
  const dispatch = useDispatch();

  // const allorders = useSelector((state) => state.getOrder.order);
  const allordersLoading = useSelector((state) => state.getOrder.loading);
  const [isExpanded, setIsExpanded] = useState({
    isExpanded: false,
    customerId: "",
  });

  // const isActiveUpdate=useSelector((state)=> state.updateisactiveorder.isActiveOrder)

  // useEffect(()=>{if(isUpdated!==null){setseen(true)}},[isUpdated])

  useEffect(() => {
    
  }, [isExpanded]);
  const columns = [
    {
      name: "Customer Name",
      selector:(row)=>row.username,
      sortable: true,
    },
    {
      name: "Table-number",
      selector:(row)=>row.tableNumber,
      sortable: true,
    },
    {
      name: "Phone-number",
      selector:(row)=>row.phoneNumber,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => {
        return row?.Orders[0]?.message?.length < 1 ||
          row?.Orders[0]?.message === null ? (
          <b className="">No message</b>
        ) : (
          <div
            style={{
              maxHeight: "100px",
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
            }}
            onClick={() => {
              setIsExpanded((prev) => ({
                isExpanded: !prev.isExpanded,
                customerId: row.Orders[0]?.customerId,
              }));
            }}
          >
            {isExpanded.isExpanded === true &&
            isExpanded.customerId === row.Orders[0]?.customerId ? (
              <textarea
                disabled
                style={{
                  width: "100%",
                  minHeight: "60px",
                  border: "none",
                  outline: "none",
                }}
                rows={3}
              >
                {row?.Orders[0]?.message}
              </textarea>
            ) : (
              <>
                {row?.Orders[0]?.message.slice(0, 12)}
                {row?.Orders[0]?.message?.length > 12 && "..."}
              </>
            )}
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Status",
      selector:(row)=>row.isActive,
      cell: (row) => (
        <div>
          {/* <ReactSwitch
         checked={row.Orders[0]?.isActive}
        /> */}
          <span>
            <b>
              {row.Orders[0]?.isActive ? (
                <div
                  className="badge text-light"
                  style={{ backgroundColor: "purple" }}
                >
                  New{" "}
                </div>
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
      name: "Operations",
      cell: (row) => (
        <div className="d-flex  " style={{ marginLeft: "-30%" }}>
          <>
            {row.Orders[0]?.isActive ? (
              <button
                className="btn btn-sm btn-outline-success"
                disabled={row.Orders[0]?.isAccepted === true}
                onClick={() => {
                  sendNotifucation(row);
                }}
              >
                {row.Orders[0]?.isAccepted === true ? (
                  <FaCheckCircle size={30} color="green" />
                ) : (
                  "Accept"
                )}
              </button>
            ) : (
              ""
            )}
            {row.Orders[0]?.isActive ? (
              <button
                onClick={() => rejectOrder(row)}
                className={
                  row.Orders[0]?.isActive
                    ? "btn btn-sm btn-outline-danger mx-2 "
                    : "btn sm btn-danger mx-2 d-none"
                }
              >
                Reject{" "}
              </button>
            ) : (
              <div
                onClick={() => UndoOrder(row)}
                className={"text-danger ml-5 cursor-pointer"}
                style={{cursor:"pointer"}}
                
              >
                <FaRedo size={22} title="undo"/>
              </div>
            )}

            <button
              onClick={() => completedOrder(row)}
              className={
                row.Orders[0]?.isActive
                  ? "btn btn-outline-info btn-sm  mr-3"
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
  const UndoOrder = (row) => {
    var obj = {
      totalamount: row?.Orders[0]?.totalAmount,
      isActive: true,
      isRejected: false,
      isCompleted: false,
      isAccepted: false,
      orderId: row?.Orders[0]?.orderId,
      customerId: row?.Orders[0]?.customerId,
      userId: row?.userId,
    };

    dispatch(updateIsActiveOrder(obj));
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
    if (row.data && row.data.Orders) {
      const orderItems = row.data.Orders.flatMap((order) => order.OrderItems);
  
      const discount = row.data.Orders[0].couponDiscountPercentage !== 0
        ? row.data.Orders[0].totalAmount * (row.data.Orders[0].couponDiscountPercentage / 100)
        : row.data.Orders[0].couponDiscountPercentage;
  
      const total = row.data.Orders[0].couponDiscountPercentage !== 0
        ? row.data.Orders[0].totalAmount - (row.data.Orders[0].totalAmount * (row.data.Orders[0].couponDiscountPercentage / 100))
        : row.data.Orders[0].totalAmount;
  
      const discountRow = {
        item_name: "Discount",
        price: "",
        quantity: "",
        total: <><FaRupeeSign size={17} /> {discount}</>,
      };
  
      const totalRow = {
        item_name: "Total",
        price: "",
        quantity: "",
        total: <><FaRupeeSign size={17} /> {total}</>,
      };
  
      const columns = [
        {
          name: "Name",
          selector:(row)=>row.item_name,
          sortable: true,
        },
        {
          name: "Price",
          selector:(row)=>row.price,
          sortable: true,
        },
        {
          name: "Quantity",
          selector:(row)=>row.quantity,
          sortable: true,
        },
        {
          name: "Total",
          selector: (rowData) => {
            if (rowData === discountRow || rowData === totalRow) {
              return rowData.total;
            }
            return (
              <>
                <small>
                  <FaRupeeSign size={17} />
                </small>{" "}
                {rowData.quantity * rowData.price}
              </>
            );
          },
          sortable: true,
        },
      ];
  
      // Apply different styles for discount and total rows
      const conditionalRowStyles = [
        {
          when: (row) => row === discountRow,
          style: {
            backgroundColor: '#ffcccb', // Light red for discount row
          },
        },
        {
          when: (row) => row === totalRow,
          style: {
            backgroundColor: '#c3e6cb', // Light green for total row
          },
        },
      ];
  
      return (
        <>
          <DataTable
            columns={columns}
            data={[...orderItems, discountRow, totalRow]}
            noHeader
            dense
            striped
            highlightOnHover
            responsive
            conditionalRowStyles={conditionalRowStyles}
          />
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
      <div className="container-fluid my-3 ">
        <input
          type="text"
          placeholder="Search by Name..."
          className="form-control"
          value={searchText} // Bind the input value to the searchText state
          onChange={handleSearch} // Call handleSearch function on input change
        />
      </div>
      <div className="mx-3">
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
                responsive
              />
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default OrderManagement;
