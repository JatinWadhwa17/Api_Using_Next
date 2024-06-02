'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";

export default function Login() {
  const route = useRouter();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const initialValues = {
    email: '', // Initial value for email field
    password: '', // Initial value for password field
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const userdata = JSON.parse(localStorage.getItem('userData'));

      if (userdata && values.email === userdata.email && values.password === userdata.password) {
        localStorage.setItem('auth', 'true');
        route.push('/apifunc');
      }
      else {
        setError('Invalid Email or Password')
      }
    }
  })



  // const submitbutton=(e)=>{
  //   e.preventDefault();
  //   const userdata=JSON.parse(localStorage.getItem('userData'));

  //   if(userdata && email===userdata.email && password===userdata.password){
  //     localStorage.setItem('auth','true');
  //     route.push('/home');
  //   }
  //   else{
  //     setError('Invalid Email or Password')
  //   }

  // }
  return (
    <>
      <div>
        <h1> Login </h1>
        <form onSubmit={formik.handleSubmit}>
          <h3>Email-id</h3>
          <input type="email" value={formik.values.email} placeholder="Enter E-mail" name="email" onChange={formik.handleChange} required></input>

          <h3>Password</h3>
          <input type="password" placeholder="Enter Password" value={formik.values.password} name="password" onChange={formik.handleChange} required></input>
          {/* {error && <p>{error}</p>} */}

          <button type="submit">Submit</button>
          <br></br>
          <Link href='/'>Dont have an account?</Link>
        </form>
      </div>
    </>
  );
}
