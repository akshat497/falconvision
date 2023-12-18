import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SuperAdminHeader from "../common/SuperAdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../../../redux/contactus/contactusthunk";
import DeleteModal from "./datatables/modals/DeleteModal";
import NoDatComponent from "../../../components/common/NoDatComponent";

const Feedbacks = () => {
  const dispatch = useDispatch();
  const fetchedData = useSelector(
    (state) => state.fetchcontactus.fetchcontactus
  );
  const loadingData = useSelector(
    (state) => state.fetchcontactus.fetchcontactusloading
  );

  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserFeedbacks, setShowUserFeedbacks] = useState(true);
  const [itemToDelete, setItemToDelete] = useState("");
  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchContact());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (fetchedData !== null && fetchedData.length > 0) {
      setFeedbacks(fetchedData);
      filterFeedbacksByPriority(showUserFeedbacks);
    } else {
      setFeedbacks([]);
      setFilteredFeedbacks([]);
    }

    setLoading(false);
  }, [fetchedData, showUserFeedbacks]);

  const columns = [
    { name: "name", selector: "name", sortable: true },
    { name: "email", selector: "email", sortable: true },
    { name: "message", selector: "message", sortable: true },
    { name: "Priority", selector: (row) => <div>{row.priority ? "true" : "false"}</div> },
    {
      name: "Operations", cell: (row) => (
        <div>
          <button
            className="btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteSuperAdminModel"
            onClick={() => setItemToDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filterFeedbacksByPriority = (isUserPriority) => {
    const filtered = feedbacks.filter((feedback) => feedback.priority === isUserPriority);
    setFilteredFeedbacks(filtered);
  };

  const handleButtonClick = (isUserPriority) => {
    setShowUserFeedbacks(isUserPriority);
    filterFeedbacksByPriority(isUserPriority);
  };

  const handleSearch = (text) => {
    setSearchedText(text);
    const filteredData = feedbacks.filter((data) => {
      return (
        data.name.toLowerCase().includes(text.toLowerCase()) ||
        data.email.toLowerCase().includes(text.toLowerCase()) ||
        data.message.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredFeedbacks(filteredData);
  };

  return (
    <>
      <DeleteModal itemToDelete={itemToDelete} />
      <SuperAdminHeader />

      <div className="dashboard">
        <h2>Feedbacks</h2>

        <div className="my-3">
          <button
            onClick={() => handleButtonClick(true)}
            className={`btn ${showUserFeedbacks ? 'btn-active' : ''}`}
          >
            User
          </button>
          <button
            onClick={() => handleButtonClick(false)}
            className={`btn ${!showUserFeedbacks ? 'btn-active' : ''} mx-2`}
          >
            Guest
          </button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchedText}
          className="form-control"
          onChange={(e) => handleSearch(e.target.value)}
        />

        {filteredFeedbacks?.length < 1 ? (
          <NoDatComponent />
        ) : (
          <>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <DataTable
                columns={columns}
                data={filteredFeedbacks || []}
                pagination
                responsive
                striped
                highlightOnHover
                pointerOnHover
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Feedbacks;
