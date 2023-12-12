import React from 'react';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { ActiveUser, FetchAllUsers } from '../../../services/Services';
import SuperAdminHeader from '../common/SuperAdminHeader';
import ReactSwitch from 'react-switch';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const navigate=useNavigate()
  const handelInfo=(row)=>{
    navigate('/superadmin/details',{state:row})
  }
  const handleToggleActive = async (row) => {
    if (row.isActive) {
      const body = {
        userId: row?.userId,
        isActive: false,
      };
      const resp = await ActiveUser(body);
      if (resp) {
        getUsers();
      }
    } else {
      const body = {
        userId: row?.userId,
        isActive: true,
      };
      const resp = await ActiveUser(body);
      if (resp) {
        getUsers();
      }
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => (
        <div>
          <ReactSwitch
            onChange={() => handleToggleActive(row)}
            checked={row?.isActive}
            id={`switch-${row?.userId}`}
          />
        </div>
      ),
    },
    {
      cell: (row) => (
        <div className='d-flex mx-2'>
          <div className='mx-2' onClick={()=>{handelInfo(row)}}><FaInfoCircle size={25}
          /></div>
           <div><FaEdit size={25}
          /></div>
        </div>
      ),
    }
  ];

  const [data, setData] = useState([]);

  async function getUsers() {
    const response = await FetchAllUsers();
    setData(response);
  }

  useEffect(() => {
    getUsers();
  }, []);

  // Custom expandable row component
  const expandableRow = ({ data }) => {
    const expandableColumns = [
      {
        name: 'User ID',
        selector: 'userId',
      },
      {
        name: 'Address',
        selector: 'address',
      },
      {
        name: 'Area',
        selector: 'area',
      },
      {
        name: 'ZIP',
        selector: 'zip',
      },
      {
        name: 'Role',
        selector: 'role',
      },
      {
        name: 'Registered On',
        selector: 'createdAt',
        cell: (row) => new Date(row.createdAt).toLocaleString(),
      },
      {
        name: 'Updated At',
        selector: 'updatedAt',
        cell: (row) => new Date(row.updatedAt).toLocaleString(),
      },
      {
        name: 'Phone Number',
        selector: 'phone',
      },
      {
        name: 'Expire On',
        selector: 'trialExpirationDate',
        cell: (row) => new Date(row.trialExpirationDate).toLocaleString(),
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

  return (
    <>
      <SuperAdminHeader />
      <div className='dashboard'>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
          expandableRows
          expandableRowsComponent={expandableRow}
          subHeader
        />
      </div>
    </>
  );
}
