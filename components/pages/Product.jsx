// src/pages/Product.jsx

import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Product() {

    const [products, setProducts] = useState([])

    const [formData, setFormData] = useState({
        productCode: "",
        productName: "",
        category: "",
        quantityInStock: "",
        unitPrice: "",
        supplierName: "",
        dateReceived: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const getProducts = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/products"
        )

        setProducts(res.data.products)
    }

    useEffect(() => {

        getProducts()

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        await axios.post(
            "http://localhost:5000/api/products",
            formData
        )

        alert("Product Added")

        getProducts()
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
                        Product Form
                    </h1>

                    <div className="grid grid-cols-2 gap-4">

                        <input type="text" name="productCode" placeholder="Product Code" className="border p-3" onChange={handleChange} />

                        <input type="text" name="productName" placeholder="Product Name" className="border p-3" onChange={handleChange} />

                        <input type="text" name="category" placeholder="Category" className="border p-3" onChange={handleChange} />

                        <input type="number" name="quantityInStock" placeholder="Quantity" className="border p-3" onChange={handleChange} />

                        <input type="number" name="unitPrice" placeholder="Unit Price" className="border p-3" onChange={handleChange} />

                        <input type="text" name="supplierName" placeholder="Supplier Name" className="border p-3" onChange={handleChange} />

                        <input type="date" name="dateReceived" className="border p-3" onChange={handleChange} />

                    </div>

                    <button className="bg-black text-white px-6 py-3 mt-5">
                        Save Product
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Product
