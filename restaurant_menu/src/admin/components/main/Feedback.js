import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import AlertBox from "./alert/AlertBox";
import NoDatComponent from "../../../components/common/NoDatComponent";

const FeedbackTable = () => {
  const [selectedRows, setselectedRows] = useState([]);
  const fetchedFeedbacks = useSelector(
    (state) => state.fetchcontactus.fetchcontactus
  );
  const [searchText, setSearchText] = useState("");
  const [fetchedFeedbacksCopy, setfetchedFeedbacksCopy] = useState([]);

  useEffect(() => {
    setfetchedFeedbacksCopy(fetchedFeedbacks);
  }, [fetchedFeedbacks]);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Email",
      selector: "email",
    },
  ];

  const ExpandableComponent = ({ data }) => (
    <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
      <h3 style={{ marginBottom: '15px', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
        Feedback Details
      </h3>
      <p style={{ marginBottom: '10px', fontSize: '16px', color: '#555' }}>
        {data.message}
      </p>
    </div>
  );

  useEffect(() => {
    const filteredOrders = fetchedFeedbacks?.filter((item) => {
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

    setfetchedFeedbacksCopy(filteredOrders);
  }, [searchText, fetchedFeedbacksCopy, fetchedFeedbacks]);
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
        {selectedRows?.length > 0 && <AlertBox selectedRows={selectedRows} />}
      </div>
      {fetchedFeedbacks?.length === 0||fetchedFeedbacks===null ? (
        <NoDatComponent />
      ) : (
        <DataTable
          columns={columns}
          data={fetchedFeedbacksCopy}
          pagination
          highlightOnHover
          striped
          expandableRows
          expandableRowsComponent={ExpandableComponent}
          selectableRows
          onSelectedRowsChange={(state) => {
            setselectedRows(state.selectedRows);
          }}
        />
      )}
    </>
  );
};

export default FeedbackTable;
