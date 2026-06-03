// src/pages/Login.jsx

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            await axios.post(
                "http://localhost:5000/api/auth/login",
                formData,
                { withCredentials: true }
            )

            alert("Login Successful")

            navigate("/products")

        } catch (error) {

            console.log(error)

            alert("Login Failed")
        }
    }

    return (

        <div className="flex justify-center items-center h-screen">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow w-96"
            >

                <h1 className="text-3xl font-bold mb-5 text-center">
                    StockHub Login
                </h1>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="border p-3 w-full mb-4"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border p-3 w-full mb-4"
                    onChange={handleChange}
                />

                <button className="bg-black text-white w-full p-3">
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login
