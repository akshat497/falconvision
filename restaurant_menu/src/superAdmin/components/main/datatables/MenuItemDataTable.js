import React from 'react';
import DataTable from 'react-data-table-component';

const MenuItemDataTable = ({MenuItems}) => {
  // Sample data for the table
  

  // Define columns for the table
  const columns = [
   
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
    },
    {
        name: 'Type',
        selector: 'type',
        sortable: true,
      },
  ];

  return (
    <DataTable
      title="Menu Items"
      columns={columns}
      data={MenuItems}
      pagination
      highlightOnHover
    />
  );
};

export default MenuItemDataTable;
