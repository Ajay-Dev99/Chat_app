
import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { userLogin } from '../Services/UserApis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Contexts/activeUser'

function Login() {
    const {setSender} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        const jwtToken = localStorage.getItem("jwt")
        if(jwtToken){
            navigate("/")
        }
    },[])

    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = async (values) => {
        try {
            if (values) {
                userLogin(values).then((res) => {
                    if (res.data) {
                        toast.success("Logedd In Successfully")
                        localStorage.setItem("jwt", res.data.token)
                        localStorage.setItem("userId",res.data.userId)
                        navigate("/")
                        setSender(res.data.userId)
                    }
                    if (res.data.status === 0) {
                        toast.error(res.data.error || "Unable To Login Now")
                    }

                }).catch((err) => {
                    toast.error(err.message || "Something went wrong")
                })

            }
        } catch (error) {
            toast.error(error.message || "something went wrong")
        }

    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required("This field is required"),
        password: Yup.string().required("This field is required ")
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    return (
        <div className='flex flex-col md:flex-row justify-between items-center h-screen'>
            <div className='flex flex-col gap-2 md:gap-10 justify-center h-full items-center w-full px-4 py-4'>

                <h1 className='text-[#EDA415] text-2xl md:text-5xl font-bold text-center block md:inline-block'>Sign In To</h1>
                <h1 className='text-[#EDA415] text-2xl md:text-5xl font-bold text-center block md:inline-block'>Your Account</h1>

                <form className="space-y-4 md:space-y-6 w-full lg:w-[35%] p-4  flex flex-col justify-center">
                    <div>
                        {formik.touched.email && formik.errors.email ? <p className="text-sm text-red-600">{formik.errors.email}</p> : null}
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 "
                            placeholder="Email"
                            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                        />
                    </div>
                    <div>
                        {formik.touched.password && formik.errors.password ? <p className="text-sm text-red-600">{formik.errors.password}</p> : null}
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                        />
                    </div>

                    <div className='text-center'>
                        <span className='font-bold underline  hover:text-blue-500 cursor-pointer '>forgot password ?</span>
                    </div>


                    <button
                        onClick={formik.handleSubmit}
                        type="submit"
                        className=" bg-[#EDA415] py-2.5 px-[5rem] text-sm font-medium text-white rounded-full border border-white "
                    >
                        Sign in
                    </button>

                </form>
            </div>
            <div className='flex flex-col gap-7 justify-center h-full items-center w-full lg:w-2/4 bg-[#003F62] text-white px-4 py-4'>
                <h1 className='text-2xl md:text-4xl font-bold'>HELLO FRIEND !</h1>
                <span className='text-lg md:text-2xl text-center block md:inline-block'>
                    Enter Your Personal Details And Start Your Journey With Us
                </span>

                <button onClick={() => navigate("/signup")} type="button" className="py-2.5 px-[5rem] text-lg font-medium text-white rounded-full border border-white  ">SIGN UP</button>
            </div>
        </div>

    )
}

export default Login
