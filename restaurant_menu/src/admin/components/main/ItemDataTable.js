import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector, } from 'react-redux';
import ReactSwitch from 'react-switch';
import {  updateItem } from '../../../redux/items/itemThunk';

import RestaurantContext from '../../../context/RestaurantContext';
import { useContext } from 'react';
import { useEffect } from 'react';

export default function ItemDatatable({setItemToDelete, onRowUpdate, searchedText}) {
  const fetchLoading=useSelector((state)=>state.fetchitem.f_itemloading)
    const {isDarkMode,setFetcheditems,
     fetcheditems,
      fetcheditemsCopy,
      setFetcheditemsCopy,}=useContext(RestaurantContext)
    // const [fetcheditems, setfetcheditems] = useState([])
    const dispatch=useDispatch();

    useEffect(()=>{
      
      if(searchedText?.type==="menu"){
        
        setSearchText(searchedText?.name)
      }
      
    },[searchedText])
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      setSearchText(searchTerm);
  
    };
    useEffect(() => {
      const filteredOrders = fetcheditemsCopy?.filter((item) => {
        return item.name.toLowerCase().includes(searchText);
      });
  
      setFetcheditems(filteredOrders);
    }, [searchText, fetcheditemsCopy, setFetcheditems]);
    const handleToggleActive=(row)=>{
  
        if(row.isActive){
          const body= {
            categoryId: row?.categoryId,
            userId: row?.userId,
            isActive:false,
            menuItemId:row.menuItemId
          }
          dispatch(updateItem(body))
          
        }else{
          const body= {
            categoryId: row?.categoryId,
            userId: row?.userId,
            isActive:true,
            menuItemId:row.menuItemId
          }
          dispatch(updateItem(body))
        }
       
      
        }
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Category',
      selector: 'Category.name', // Use nested object property
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
    },
    {
        name: 'Status',
        selector: 'isActive', 
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
      name: 'Actions',
      cell: (row) => (
        <div>
          <button
             onClick={() => onRowUpdate(row)}
            className='btn  text-light mx-2'
            disabled={!row?.isActive}
            // data-bs-toggle="modal"
            //  data-bs-target="#exampleModal"
            style={{backgroundColor:"purple"}}
          >
            Update
          </button>
          <button
             onClick={() => setItemToDelete(row)}
            className='btn btn-danger'
            disabled={!row?.isActive}
            data-bs-toggle="modal" data-bs-target="#deleteModel"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '60px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
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
}
  return (
    <div className={isDarkMode?'bg-dark text-light my-5':"bg-dark text-light my-5"}>
    {/* <ReactSwitch
     checked={showDataTable}
        onChange={()=>{handleView()}}
    /> */}
    {/* {showDataTable?<span className='mx-2 my-2'>table view activated</span>:<span className='mx-2 my-2'>table view deActivated</span>} */}
        {fetchLoading?CustomTableSkeleton():<DataTable
      
      columns={columns}
      data={fetcheditems||[]}
      customStyles={customStyles}
      
      highlightOnHover
      pagination
      subHeader
      subHeaderComponent={
        <input
          type="text"
          style={{width:"200px",borderRadius:"10px",borderColor:"purple"}}
          placeholder="Search by Name..."
          value={searchText} // Bind the input value to the searchText state
          onChange={handleSearch} // Call handleSearch function on input change
        />
      }
    />}
        
    </div>
  );
}
