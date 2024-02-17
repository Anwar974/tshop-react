import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik'
import {forgotPasswordSchema, registerSchema} from '../validation/validate.js'
import *  as yup from 'yup'
import {toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {

    const navigate = useNavigate();
    const initialValues ={

        email:'',
        password:'',
        code:'',
    };

 
   const  onSubmit = async users=>{
       
        
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,users)
        if(data.message=='success'){
            formik.resetForm();
            toast.success('password updated', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/')
        }
   }
   
    const formik = useFormik({
        initialValues,
        onSubmit,
       validationSchema : forgotPasswordSchema,
    });

    const inputs =[
        
        {
            id: 'email',
            type: 'email',
            name: 'email',
            title: 'user email',
            value: formik.values.email,
        },
        {
            id: 'password',
            type: 'password',
            name: 'password',
            title: 'user password',
            value: formik.values.password
        },
        {
            id: 'code',
            type: 'text',
            name: 'code',
            title: 'code',
            value: formik.values.code,
        },
        
    ]

    const renderInputs = inputs.map((input, index)=>
    <Input 
    type={input.type} 
    id={input.id} 
    name={input.name} 
    title={input.title} 
    key={index} 
    value={input.value} 
    errors={formik.errors} 
    onChange={input.onChange || formik.handleChange } 
    onBlur={formik.handleBlur}
    touched={formik.touched}
     />
    )

  return (
<>
<div className="container bg-dark text-white">

    <h2>forgot pass</h2>

<div className="w-50" >
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {renderInputs}

        <button type='submit' disabled={!formik.isValid}>change password</button>
    </form>

    </div>
</div>

</>  )
}
