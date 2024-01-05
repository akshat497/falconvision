import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import ReactSwitch from "react-switch";
import { updateItem } from "../../../redux/items/itemThunk";

import RestaurantContext from "../../../context/RestaurantContext";
import { useContext } from "react";
import { useEffect } from "react";
import NoDatComponent from "../../../components/common/NoDatComponent";
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import AlertBox from "./alert/AlertBox";

export default function ItemDatatable({
  setItemToDelete,
  onRowUpdate,
  searchedText,
}) {
  const fetchLoading = useSelector((state) => state.fetchitem.f_itemloading);
  const {
    isDarkMode,
    setFetcheditems,
    fetcheditems,
    fetcheditemsCopy,
    setFetcheditemsCopy,
  } = useContext(RestaurantContext);
  // const [fetcheditems, setfetcheditems] = useState([])
  const dispatch = useDispatch();
  const allFetchedItems = useSelector((state) => state.fetchitem.f_item);
  // useEffect(() => {
  //   if (searchedText?.type === "menu") {
  //     setSearchText(searchedText?.name);
  //   }
  // }, [searchedText]);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setselectedRows] = useState([]);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
  };
  useEffect(() => {
    const filteredOrders = fetcheditemsCopy?.filter((item) => {
      const searchTerm = searchText.toLowerCase();

      return (
        item.name.toLowerCase().includes(searchTerm) ||
        (item.Category &&
          item.Category.name.toLowerCase().includes(searchTerm)) ||
        (item.price && item.price.toString().includes(searchTerm)) ||
        (item.isActive &&
          item.isActive.toString().toLowerCase().includes(searchTerm))
      );
    });

    setFetcheditems(filteredOrders);
  }, [searchText, fetcheditemsCopy, setFetcheditems]);

  const handleToggleActive = (row) => {
    const formdata = new FormData();

    // Assuming `itemData` and `restroDetails` are defined

    formdata.append("name", row.name);
    formdata.append("userId", row?.userId);
    formdata.append("categoryId", row?.categoryId);
    formdata.append("menuItemId", row?.menuItemId);
    formdata.append("isActive", !row?.isActive);
    dispatch(updateItem({ formdata, userId: row?.userId }));
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Category",
      selector: "Category.name", // Use nested object property
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Status",
      selector: "isActive",
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
            onClick={() => onRowUpdate(row)}
            className=" mx-2 "
            disabled={!row?.isActive}
            // data-bs-toggle="modal"
            //  data-bs-target="#exampleModal"
            style={{ color: "purple", cursor: "pointer" }}
          >
            <FaEdit size={32} />
          </div>
          <div
            onClick={() => setItemToDelete(row)}
            className=" text-danger mx-4"
            style={{ cursor: "pointer" }}
            disabled={!row?.isActive}
            data-bs-toggle="modal"
            data-bs-target="#deleteModel"
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

  //   const DarkStyledDataTable = styled(DataTable)`
  //   background-color: #333; /* Dark background color */
  //   color: white; /* Text color */

  //   .rdt_TableHead {
  //   background-color: #333; /* Dark background color */
  //   color: white; /* Text color */
  // }

  //   .rdt_TableRow {
  //     background-color: #444; /* Dark background color for rows */
  //   }

  //   .rdt_TableRow:hover {
  //     background-color: #555; /* Dark background color for hover */
  //   }

  //   .rdt_TableRow.selected {
  //     background-color: #666; /* Dark background color for selected row */
  //   }

  //   .rdt_Table_Pagination {
  //     background-color: #333; /* Dark background color for pagination */
  //   }

  //   .rdt_Search input {
  //     background-color: #444; /* Dark background color for search input */
  //   }
  // `;
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
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search ..."
          value={searchText} // Bind the input value to the searchText state
          onChange={handleSearch} // Call handleSearch function on input change
        />
        {selectedRows.length > 0 && <AlertBox selectedRows={selectedRows} />}
      </div>
      {fetcheditems?.length === 0 || fetcheditems === null ? (
        <NoDatComponent />
      ) : (
        <div
          
        >
          {/* <ReactSwitch
     checked={showDataTable}
        onChange={()=>{handleView()}}
    /> */}
          {/* {showDataTable?<span className='mx-2 my-2'>table view activated</span>:<span className='mx-2 my-2'>table view deActivated</span>} */}
          {fetchLoading ? (
            CustomTableSkeleton()
          ) : (
            <DataTable
            
              columns={columns}
              data={fetcheditems || []}
              customStyles={customStyles}
              highlightOnHover
              pagination
              responsive
              selectableRows
              onSelectedRowsChange={(state) => {
                setselectedRows(state.selectedRows);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
