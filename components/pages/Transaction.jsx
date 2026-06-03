// src/pages/Transaction.jsx

import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Transaction() {

    const [transactions, setTransactions] = useState([])

    const [products, setProducts] = useState([])

    const [warehouses, setWarehouses] = useState([])

    const [formData, setFormData] = useState({
        product: "",
        warehouse: "",
        transactionDate: "",
        quantityMoved: "",
        transactionType: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const getTransactions = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/transactions"
        )

        setTransactions(res.data.transactions)
    }

    const getProducts = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/products"
        )

        setProducts(res.data.products)
    }

    const getWarehouses = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/warehouses"
        )

        setWarehouses(res.data.warehouses)
    }

    useEffect(() => {

        getTransactions()
        getProducts()
        getWarehouses()

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        await axios.post(
            "http://localhost:5000/api/transactions",
            formData
        )

        alert("Transaction Added")

        getTransactions()
    }

    const deleteTransaction = async (id) => {

        await axios.delete(
            `http://localhost:5000/api/transactions/${id}`
        )

        alert("Transaction Deleted")

        getTransactions()
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
                        Transaction Form
                    </h1>

                    <div className="grid grid-cols-2 gap-4">

                        <select
                            name="product"
                            className="border p-3"
                            onChange={handleChange}
                        >

                            <option>Select Product</option>

                            {
                                products.map((product) => (

                                    <option
                                        key={product._id}
                                        value={product._id}
                                    >
                                        {product.productName}
                                    </option>
                                ))
                            }

                        </select>

                        <select
                            name="warehouse"
                            className="border p-3"
                            onChange={handleChange}
                        >

                            <option>Select Warehouse</option>

                            {
                                warehouses.map((warehouse) => (

                                    <option
                                        key={warehouse._id}
                                        value={warehouse._id}
                                    >
                                        {warehouse.warehouseName}
                                    </option>
                                ))
                            }

                        </select>

                        <input
                            type="date"
                            name="transactionDate"
                            className="border p-3"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="quantityMoved"
                            placeholder="Quantity"
                            className="border p-3"
                            onChange={handleChange}
                        />

                        <select
                            name="transactionType"
                            className="border p-3"
                            onChange={handleChange}
                        >

                            <option>Select Type</option>

                            <option value="IN">
                                STOCK IN
                            </option>

                            <option value="OUT">
                                STOCK OUT
                            </option>

                        </select>

                    </div>

                    <button className="bg-black text-white px-6 py-3 mt-5">
                        Save Transaction
                    </button>

                </form>

                <div className="bg-white mt-10 p-5 rounded shadow">

                    <h1 className="text-2xl font-bold mb-5">
                        Transactions
                    </h1>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-black text-white">

                                <th className="p-3">Product</th>
                                <th>Warehouse</th>
                                <th>Quantity</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                transactions.map((transaction) => (

                                    <tr
                                        key={transaction._id}
                                        className="border text-center"
                                    >

                                        <td className="p-3">
                                            {transaction.product?.productName}
                                        </td>

                                        <td>
                                            {transaction.warehouse?.warehouseName}
                                        </td>

                                        <td>
                                            {transaction.quantityMoved}
                                        </td>

                                        <td>
                                            {transaction.transactionType}
                                        </td>

                                        <td>
                                            {transaction.transactionDate?.substring(0,10)}
                                        </td>

                                        <td>

                                            <button
                                                onClick={() => deleteTransaction(transaction._id)}
                                                className="bg-red-500 text-white px-4 py-2"
                                            >
                                                Delete
                                            </button>

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

export default Transaction
