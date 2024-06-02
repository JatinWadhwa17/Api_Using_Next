import * as Yup from 'yup';

export const Signup = Yup.object({
  id: Yup.string().min(1).required('Please enter id'),
  name: Yup.string().min(2).max(25).required('Pls Enter name'),
  username: Yup.string().min(4).required('please enter your email'),
  phone: Yup.string().min(10).required('please enter your Phone'),

})