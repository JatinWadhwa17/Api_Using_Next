'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useFormik } from 'formik';
import { Signup } from './yup';
import axios from 'axios';
import FormDialog from './dialog';
import {useState, useEffect} from 'react';


export default function PersistentDrawerRight({ toggleDrawer, open, setRows, rows, editing, setEditing, selectedRow}) {
  const[dialog,setdialog]=useState(false);
  const[find,setfind]=useState(false);
  
  const initialValues = {
    id: selectedRow?.id ||'',
    name: selectedRow?.name ||'',
    username: selectedRow?.username ||'',
    phone: selectedRow?.phone ||'',
  };


  const formik = useFormik({
    initialValues,
    validationSchema: Signup,
    onSubmit: async (values, actions) => {
      try {
        if(find){
        
        setdialog(true);
        }
        
      } catch (error) {
        console.log('Error:', error);
      }
      
    }
  });

  useEffect(() => {
    if (selectedRow) {
      formik.setValues(selectedRow); // update form values when selectedRow changes
    }
  }, [selectedRow]);

  const handleSubmitDialog = (confirmation) => {
    if (confirmation === 'Submit') {
      formSubmission(formik.values,formik.resetForm); // Call formSubmission only when confirmation is 'Submit'
    }
    setdialog(false); // Close the dialog regardless of confirmation
  };

  const formSubmission = async (values,resetForm) => {
    if(editing){
      await handleupdate(values.id,values);
      resetForm();
      setEditing(false);
    }
    else{
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', values);
    const a = response.data;
    setRows([...rows, a]);
    }
    resetForm();
    toggleDrawer(false);
    setdialog(false);
  };

  const handleupdate=async(id,values)=>{
    const res=await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,values);

    const updated=res.data;
    const updatedrow=rows.map(row=>(row.id===id? updated :row));
    setRows(updatedrow);
  }



  const DrawerList = (
    <Box sx={{ width: 550 }}>
      <div>{editing ? <h1>Edit details</h1>: <h1>Add Employee Details</h1>}
          <form onSubmit={formik.handleSubmit}>
            <h3>ID</h3>
            <input
              type='text'
              name='id'
              placeholder='Enter ID'
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.id && formik.touched.id ? <p className='form-error'>{formik.errors.id}</p> : null}

            <h3>Name</h3>
            <input
              type='text'
              name='name'
              placeholder='Enter Name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <p className='form-error'>{formik.errors.name}</p> : null}
            <h3>Username</h3>
            <input
              type='text'
              name='username'
              placeholder='Enter Username'
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username ? <p className='form-error'>{formik.errors.username}</p> : null}

            <h3>Phone</h3>
            <input
              type='number'
              name='phone'
              placeholder='Enter Phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? <p className='form-error'>{formik.errors.phone}</p> : null}

            <button type='submit' onClick={()=>setfind(true)}>Submit</button>
            <button type='submit' onClick={()=>{setfind(false); toggleDrawer(false);}}>Cancel</button>
            {dialog && <FormDialog dialog={dialog} setdialog={setdialog} handleSubmitDialog={handleSubmitDialog}></FormDialog>}
          </form>
          
        </div>
    </Box> 
  );

  return (
    <div>

      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
