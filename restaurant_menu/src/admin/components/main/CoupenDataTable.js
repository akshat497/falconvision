import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import ReactSwitch from "react-switch";

import RestaurantContext from "../../../context/RestaurantContext";
import { useContext } from "react";
import { useEffect } from "react";
import { updateCoupon } from "../../../redux/coupon/couponCodeThunk";

import UpdateCouponModel from "./UpdateCouponModel";
import DeleteCouponModal from "./DeleteCouponModel";
import NoDatComponent from "../../../components/common/NoDatComponent";
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import AlertBox from "./alert/AlertBox";

export default function CoupenDataTable() {
  const fetchLoading = useSelector((state) => state.fetchitem.f_itemloading);
  const couponCodes = useSelector((state) => state.getCoupon.getCoupon);

  const {
    isDarkMode,

    fetchedCoupens,
    setfetchedCoupens,
  } = useContext(RestaurantContext);
  // const [fetcheditems, setfetcheditems] = useState([])
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [clickedRow, setclickedRow] = useState([]);
  const [selectedRows, setselectedRows] = useState([]);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
  };
  useEffect(() => {
    const filteredOrders = couponCodes?.filter((item) => {
      const lowerCaseSearchText = searchText.toLowerCase();

      return (
        item.name.toLowerCase().includes(lowerCaseSearchText) ||
        (typeof item.discount === "number" &&
          item.discount.toString().includes(lowerCaseSearchText))
      );
    });

    setfetchedCoupens(filteredOrders);
  }, [searchText, couponCodes, setfetchedCoupens]);

  const handleToggleActive = (row) => {
    if (row.isActive) {
      const body = {
        name: row.name,
        userId: row?.userId,
        isActive: false,
        discount: row.discount,
        CoupenCodeId: row.CoupenCodeId,
      };
      dispatch(updateCoupon(body));
    } else {
      const body = {
        name: row.name,
        userId: row?.userId,
        isActive: true,
        discount: row.discount,
        CoupenCodeId: row.CoupenCodeId,
      };
      dispatch(updateCoupon(body));
    }
  };
  const columns = [
    {
      name: "Name",
      selector:(row)=>row.name,
      sortable: true,
    },

    {
      name: "Discount",
      selector: (row) => {
        return <div>{row.discount + " %"}</div>;
      },
      sortable: true,
    },
    {
      name: "Status",
      selector:(row)=>row.isActive,

      cell: (row) => (
        <div>
          {/* {(row)} */}
          <ReactSwitch
            onChange={() => handleToggleActive(row)}
            checked={row?.isActive}
            id={`switch-${row?.categoryId}`}
            onColor="#800080" // Set the color when the switch is on (purple)
            offColor="#d3d3d3"
          />
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <div
            onClick={() => {
              setclickedRow(row);
            }}
            className=" mx-2 "
            disabled={!row?.isActive}
            data-bs-toggle="modal"
            data-bs-target="#updatecoupon"
            // data-bs-toggle="modal"
            //  data-bs-target="#exampleModal"
            style={{ color: "purple", cursor: "pointer" }}
          >
            <FaEdit size={32} />
          </div>
          <div
            onClick={() => {
              setclickedRow(row);
            }}
            className=" text-danger mx-4"
            style={{ cursor: "pointer" }}
            disabled={!row?.isActive}
            data-bs-toggle="modal"
            data-bs-target="#deleteCouponModel"
          >
            <FaTrashAlt size={32} />
          </div>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
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
  };
  return (
    <>
      <UpdateCouponModel row={clickedRow} />
      <DeleteCouponModal row={clickedRow} />
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search ..."
          value={searchText}
          onChange={handleSearch}
        />

        {selectedRows.length > 0 && (
          <AlertBox selectedRows={selectedRows} setselectedRows={setselectedRows}/>
        )}
      </div>
      {fetchedCoupens?.length === 0 || fetchedCoupens === null ? (
        <NoDatComponent />
      ) : (
        <div
          className={isDarkMode ? "bg-dark text-light " : "bg-dark text-light "}
        >
          {fetchLoading ? (
            CustomTableSkeleton()
          ) : (
            <>
              <DataTable
                columns={columns || ''}
                data={fetchedCoupens || []}
                customStyles={customStyles}
                highlightOnHover
                pagination
                responsive
                selectableRows
                onSelectedRowsChange={(state) => {
                  setselectedRows(state.selectedRows);
                }}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
