import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import Switch from "react-switch";

import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../../redux/items/itemThunk";

import DeleteConfirmationModal from "./DeleteConfirmationModal";
import NoDatComponent from "../../../components/common/NoDatComponent";

const CategoryTable = ({ categories, onUpdate, searchedText }) => {
  const loading = useSelector(
    (state) => state.fetchcategory.fetchedcategoryloading
  );
  const [itemData, setItemData] = useState({ name: "" });
  const [clickedRow, setClickedRow] = useState({});
  const [searchText, setSearchText] = useState("");
  const [categoryCopy, setcategoryCopy] = useState("");
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

  useEffect(() => {
    setItemData({ name: clickedRow.name });
  }, [clickedRow]);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "",
      selector: "",
    },
    {
      name: "Status",
      selector: "isActive",

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
      selector: "",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            onClick={() => handleUpdate(row)}
            className="btn text-light mx-2 my-2"
            style={{ backgroundColor: "purple" }}
            disabled={!row.isActive}
          >
            Update
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={() => {
              handleDelete(row);
            }}
            disabled={!row.isActive}
            data-bs-toggle="modal"
            data-bs-target="#deleteModelCategory"
          >
            Delete
          </button>
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
      </div>
      {loading ? (
        CustomTableSkeleton()
      ) : (
        <div className=" ">
          {categoryCopy === null || categoryCopy?.length === 0 ? (
            <NoDatComponent />
          ) : (
            <DataTable
              columns={columns}
              data={categoryCopy}
              highlightOnHover
              pagination
              responsive
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
                  className="btn btn-success"
                  data-bs-dismiss="modal"
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
