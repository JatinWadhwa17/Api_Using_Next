import * as Yup from 'yup';

export const Signup=Yup.object({
  name:Yup.string().min(2).max(25).required('Pls Enter name'),
  email:Yup.string().email().required('please enter your email'),
  password:Yup.string().min(6).required('Please enter password')
})