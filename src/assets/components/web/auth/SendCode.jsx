import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik'
import { sendCodeSchema} from '../validation/validate.js'
import {toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User.jsx';

 export default function SendCode() {
    let { setUserToken} =  useContext(UserContext);

const navigate = useNavigate();

     const initialValues ={
        email:'',
    };

   const  onSubmit = async users=>{
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendCode`,users)
        if(data.message=='success') 
            localStorage.setItem('userToken',data.token)
            setUserToken(data.token);
            toast.success('input code', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/forgotPassword')
        }
   
   
    const formik = useFormik({
        initialValues,
        onSubmit,
       validationSchema : sendCodeSchema,
    });

    const inputs =[
       {
            id: 'email',
            type: 'email',
            name: 'email',
            title: 'user email',
            value: formik.values.email,
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
    onChange={formik.handleChange } 
    onBlur={formik.handleBlur}
    touched={formik.touched}
     />
    )

  return (
<>
<div className="container bg-dark text-white">

    <h2>Send Code</h2>

<div className="w-50" >
    <form onSubmit={formik.handleSubmit} >
        {renderInputs}
        <button type='submit' disabled={!formik.isValid}>send code</button>
    </form>

    </div>
</div>

</>  )
}
