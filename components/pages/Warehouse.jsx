// src/pages/Warehouse.jsx

import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Warehouse() {

    const [warehouses, setWarehouses] = useState([])

    const [formData, setFormData] = useState({
        warehouseCode: "",
        warehouseName: "",
        warehouseLocation: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const getWarehouses = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/warehouses"
        )

        setWarehouses(res.data.warehouses)
    }

    useEffect(() => {

        getWarehouses()

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        await axios.post(
            "http://localhost:5000/api/warehouses",
            formData
        )

        alert("Warehouse Added")

        getWarehouses()
    }

    return (

        <div>

            <Navbar />

            <div className="p-5">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-5 rounded shadow"
                >

                    <h1 className="text-2xl font-bold mb-5">
                        Warehouse Form
                    </h1>

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="warehouseCode"
                            placeholder="Warehouse Code"
                            className="border p-3"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="warehouseName"
                            placeholder="Warehouse Name"
                            className="border p-3"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="warehouseLocation"
                            placeholder="Warehouse Location"
                            className="border p-3"
                            onChange={handleChange}
                        />

                    </div>

                    <button className="bg-black text-white px-6 py-3 mt-5">
                        Save Warehouse
                    </button>

                </form>

                <div className="bg-white mt-10 p-5 rounded shadow">

                    <h1 className="text-2xl font-bold mb-5">
                        Warehouses
                    </h1>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-black text-white">

                                <th className="p-3">Code</th>
                                <th>Name</th>
                                <th>Location</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                warehouses.map((warehouse) => (

                                    <tr
                                        key={warehouse._id}
                                        className="border text-center"
                                    >

                                        <td className="p-3">
                                            {warehouse.warehouseCode}
                                        </td>

                                        <td>
                                            {warehouse.warehouseName}
                                        </td>

                                        <td>
                                            {warehouse.warehouseLocation}
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default Warehouse
