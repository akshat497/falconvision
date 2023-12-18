import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { FetchAllUsers } from "../../../services/Services";
import SuperAdminHeader from "../common/SuperAdminHeader";
import ReactSwitch from "react-switch";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UpdateBySuperAdminModal from "./datatables/modals/UpdateBySuperAdminModal";
import { fetchAllUsers, updateUser } from "../../../redux/users/userthunk";
import { useDispatch, useSelector } from "react-redux";

export default function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchedUser = useSelector((state) => state.fetchAllUsers.fetchAllUsers);
  const [searchedText, setSearchedText] = useState("");
  const [data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
  const [itemToUpdate, setitemToUpdate] = useState([]);

  const handelInfo = (row) => {
    navigate("/superadmin/details", { state: row });
  };
  const handleToggleActive = (row) => {
    if (row.isActive === true) {
      const body = {
        userId: row?.userId,
        isActive: false,
      };
      dispatch(updateUser(body));
    } else {
      const body = {
        userId: row?.userId,
        isActive: true,
      };
      dispatch(updateUser(body));
    }
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          <ReactSwitch
            onChange={() => handleToggleActive(row)}
            checked={row?.isActive}
            id={`switch-${row?.userId}`}
            onColor="#800080" // Set the color when the switch is on (purple)
            offColor="#d3d3d3"
            disabled={row.role === "superadmin"}
          />
        </div>
      ),
    },
    {
      cell: (row) => (
        <div className="d-flex mx-2">
          <div
            className="mx-5"
            onClick={() => {
              handelInfo(row);
            }}
          >
            <FaInfoCircle size={25} />
          </div>
          <div>
            <FaEdit
              size={25}
              data-bs-toggle="modal"
              data-bs-target="#updateSuperAdminModel"
              onClick={() => {
                setitemToUpdate(row);
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  useEffect(() => {
    setData(fetchedUser);
    setDataCopy(fetchedUser);
  }, [fetchedUser]);
  // Custom expandable row component
  const expandableRow = ({ data }) => {
    const expandableColumns = [
      {
        name: "User ID",
        selector: "userId",
      },
      {
        name: "Address",
        selector: "address",
      },
      {
        name: "Area",
        selector: "area",
      },
      {
        name: "ZIP",
        selector: "zip",
      },
      {
        name: "Role",
        selector: "role",
      },
      {
        name: "Registered On",
        selector: "createdAt",
        cell: (row) => new Date(row.createdAt).toLocaleString(),
      },
      {
        name: "Updated At",
        selector: "updatedAt",
        cell: (row) => new Date(row.updatedAt).toLocaleString(),
      },
      {
        name: "Phone Number",
        selector: "phone",
      },
      {
        name: "Expire On",
        selector: "trialExpirationDate",
        cell: (row) => {
          const expirationDate = new Date(row.trialExpirationDate);
          const currentDate = new Date();

          if (expirationDate < currentDate) {
            return <div className="text-danger">Expired</div>;
          } else {
            return expirationDate.toLocaleString();
          }
        },
      },
    ];

    return (
      <DataTable
        columns={expandableColumns}
        data={[data]} // Convert single data item to an array
        noHeader
        highlightOnHover
      />
    );
  };

  useEffect(() => {
    const filteredData = dataCopy?.filter((item) => {
      const searchString = searchedText.toLowerCase();

      return (
        item.name.toLowerCase().includes(searchString) ||
        item.email.toLowerCase().includes(searchString) ||
        (item.role && item.role.toLowerCase().includes(searchString)) ||
        (item.address && item.address.toLowerCase().includes(searchString)) ||
        (item.area && item.area.toLowerCase().includes(searchString)) ||
        (item.zip &&
          typeof item.zip === "string" &&
          item.zip.toLowerCase().includes(searchString)) ||
        (item.phone && item.phone.toLowerCase().includes(searchString)) ||
        (item.trialExpirationDate &&
          new Date(item.trialExpirationDate)
            .toLocaleString()
            .toLowerCase()
            .includes(searchString))
      );
    });

    setData(filteredData);
  }, [searchedText, dataCopy]);

  return (
    <>
      <SuperAdminHeader />
      <UpdateBySuperAdminModal itemToUpdate={itemToUpdate} />
      <div className="dashboard">
        <div>
          <input
            type="search"
            placeholder="Search ..."
            className="form-control"
            value={searchedText}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
          />
        </div>
        <div>
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            pointerOnHover
            expandableRows
            expandableRowsComponent={expandableRow}
            subHeader
            conditionalRowStyles={[
              {
                when: (row) => row.role === "superadmin",
                style: {
                  backgroundColor: "lightGreen", // Set the desired background color for superadmin rows
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
