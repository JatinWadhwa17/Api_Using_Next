'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTable.css';
import PersistentDrawerRight from './sidebar';
import { useFormik } from 'formik';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(true);

  const [editing,setEditing]=useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // new state to store the selected row

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setRows(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [])


  const handleEditClick = (row) => {
    //console.log('Edit button clicked for row:', row);
    setEditing(true);
    setSelectedRow(row);
    setDrawer(true);
    toggleDrawer(true);
  };

  const handleAddClick = () => {
    setDrawer(true);
    toggleDrawer(true);
    setSelectedRow(null);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {drawer && <PersistentDrawerRight toggleDrawer={toggleDrawer} open={open} setRows={setRows} rows={rows} setEditing={setEditing} editing={editing} selectedRow={selectedRow}/>}
      <div>
        <h1>Employee Data</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th><button onClick={handleAddClick}>Add</button></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.username}</td>
                <td>{row.phone}</td>
                <td>
                  <button onClick={() => handleEditClick(row)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Stack spacing={2} style={{ marginTop: '20px' }}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Stack>

        
      </div>
    </>
  );
}

export default DataTable;



