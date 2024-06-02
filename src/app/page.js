'use client';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { Signup } from './yup';

export default function Home() {
  const router = useRouter();
  //const[username,setUsername]=useState('');
  //const[email,setEmail]=useState('');
  //const[password,setPassword]=useState('');
  //const[error,seterror]=useState('');

  const initialValues = {
    name: '',
    email: '',
    password: ''
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Signup,
    onSubmit: (values, action) => {
      console.log(values);
      localStorage.setItem('userData', JSON.stringify(values));
      router.push('/login');
      action.resetForm();
    }
  })


  return (
    <main>
      <form onSubmit={formik.handleSubmit}>
        <h1>Register</h1>
        <h3>Username</h3>
        <input type="text" name='name' value={formik.values.name} placeholder='Enter Name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.name && formik.touched.name ? <p className='form-error'>{formik.errors.name}</p> : null}
        <h3>Email-id</h3>
        <input type="email" name='email' value={formik.values.email} placeholder='Enter Email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email ? <p className='form-error'>{formik.errors.email}</p> : null}
        <h3>Password</h3>
        <input type="password" value={formik.values.password} placeholder="Enter Password" name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <p className='form-error'>{formik.errors.password}</p> : null}

        <button type="submit">Register</button>
        <br></br>

        <Link href="/login">Already have an account</Link>
      </form>
    </main>
  );
}
// const handleSubmit = (e) => {
//   e.preventDefault();
//   if(!username || !email || !password){
//     seterror('Fill all fields');
//     return;
//   }
