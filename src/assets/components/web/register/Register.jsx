import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik'
import {registerSchema} from '../validation/validate.js'
import *  as yup from 'yup'
import {toast } from 'react-toastify';
import axios from 'axios'

export default function Register() {

    const initialValues ={
        userName:'',
        email:'',
        password:'',
        image:''
    };

    const handleFieldChange =(event) => {
        // console.log(event);      //has "target" of the image
        // console.log(event.target.files);   //info to send to backend
        formik.setFieldValue('image',event.target.files[0])
    }
   const  onSubmit = async users=>{
        const formData =new FormData();    // empty object

        formData.append("userName", users.userName);
        formData.append("email", users.email);
        formData.append("password", users.password);
        formData.append("image", users.image);

         // console.log(formData);
        
        // for(let data of formData.entries()){
        //     console.log(data);
        // }

        
        const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData)
        // console.log(data);
        if(data.message=='success'){
            formik.resetForm();
            toast.success('account created succefully!, please verify email to login', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
   }
   
    const formik = useFormik({
        initialValues,
        onSubmit,
       validationSchema : registerSchema,
    });

    const inputs =[
        {
            id: 'usernames',
            type: 'text',
            name: 'userName',   // i get the name from backend
            title: 'user name',
            value: formik.values.userName,
        },
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
            id: 'image',
            type: 'file',
            name :'image',
            title: 'user image',
            onChange:handleFieldChange//لما اغير الصورة بنفذ الفنكشن ، الصورة 
            //الصورة ما الها فاليو زي الباقي
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

    <h2>create account</h2>

<div className="w-50" >
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {renderInputs}

        <button type='submit' disabled={!formik.isValid}>Register</button>
    </form>

    </div>
</div>

</>  )
}
