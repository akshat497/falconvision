import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import Switch from "react-switch";

import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../../redux/items/itemThunk";

import DeleteConfirmationModal from "./DeleteConfirmationModal";
import NoDatComponent from "../../../components/common/NoDatComponent";
import { FaEdit, FaInfo, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import AlertBox from "./alert/AlertBox";

const CategoryTable = ({ categories, onUpdate, searchedText }) => {
  const categoryCloseRef=useRef()
  const loading = useSelector(
    (state) => state.fetchcategory.fetchedcategoryloading
  );
  const updateCategoryResponse = useSelector(
    (state) => state.updatecategory.u_category
  );
  const [itemData, setItemData] = useState({ name: "" });
  const [clickedRow, setClickedRow] = useState({});
  const [searchText, setSearchText] = useState("");
  const [categoryCopy, setcategoryCopy] = useState("");
  const [selectedRows, setselectedRows] = useState([]);
  const [disabled, setdisabled] = useState(true);
  useEffect(() => {
    setcategoryCopy(categories);
  }, [categories]);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
  };
  // Object to store deleting status
  const ref = useRef();
  const dispatch = useDispatch();
useEffect(()=>{
  if(updateCategoryResponse?.success===true){
    categoryCloseRef.current.click()
  }
},[updateCategoryResponse])
  const handleUpdate = (row) => {
    setClickedRow(row);
    ref.current.click();
  };
  const handleToggleActive = (row) => {
    if (row.isActive) {
      const body = {
        categoryId: row?.categoryId,
        name: row?.name,
        userId: row?.userId,
        isActive: false,
      };
      dispatch(updateCategory(body));
    } else {
      const body = {
        categoryId: row?.categoryId,
        name: row?.name,
        userId: row?.userId,
        isActive: true,
      };
      dispatch(updateCategory(body));
    }
  };
  const handleDelete = (row) => {
    setClickedRow(row);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
    
  };
  useEffect(()=>{
    
    if(itemData?.name!==clickedRow?.name){
      setdisabled(false)
    }else{
      setdisabled(true)
    }
  },[clickedRow,itemData])
  useEffect(() => {
    setItemData({ name: clickedRow.name });
  }, [clickedRow]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "",
     
    },
    {
      name: "Status",
      selector: (row) => row.isActive,
      
      cell: (row) => (
        <div>
          <Switch
            onChange={() => handleToggleActive(row)}
            checked={row?.isActive}
            id={`switch-${row.categoryId}`}
            onColor="#800080" // Set the color when the switch is on (purple)
            offColor="#d3d3d3"
          />
        </div>
      ),
    },
    {
      name: "",
      
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <div
            onClick={() => handleUpdate(row)}
            className=" mx-2 "
            style={{  color:"purple", cursor:"pointer"}}
            disabled={!row.isActive}
          >
            <FaEdit size={32}/>
          </div>
          <div
            className="text-danger mx-4  "
            style={{   cursor:"pointer"}}
            onClick={() => {
              handleDelete(row);
            }}
            disabled={!row.isActive}
            data-bs-toggle="modal"
            data-bs-target="#deleteModelCategory"
          >
            <FaTrashAlt size={32}/>
          </div>
        </div>
      ),
    },
  ];
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
  useEffect(() => {
    if (searchedText?.type === "category") {
      setSearchText(searchedText?.name);
    }
  }, [searchedText]);
  useEffect(() => {
    const filteredOrders = categories?.filter((item) => {
      return item?.name?.toLowerCase().includes(searchText);
    });

    setcategoryCopy(filteredOrders);
  }, [searchText]);

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
         {selectedRows.length > 0 && (
          <AlertBox selectedRows={selectedRows}/>
        )}
      </div>
      {loading ? (
        CustomTableSkeleton()
      ) : (
        <div className=" ">
          {categoryCopy === null || categoryCopy?.length === 0 ? (
            <NoDatComponent />
          ) : (
            <DataTable
            
              columns={columns||''}
              data={categoryCopy}
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
      <div>
        <button
          type="button"
          ref={ref}
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade centered"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {clickedRow.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={categoryCloseRef}
                />
              </div>
              <div className="modal-body">
                <div className="add-item-container">
                  <h2>Update Category</h2>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={itemData?.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn text-light pl-3 pr-3 pt-2 pb-2"
                  style={{backgroundColor:"purple"}}
                  data-bs-dismiss="modal"
                  disabled={disabled===true}
                  onClick={() => onUpdate(clickedRow, itemData)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal categories={clickedRow} />
    </>
  );
};

export default CategoryTable;
