// src/pages/Reports.jsx

import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Reports() {

    const [availableStock, setAvailableStock] = useState([])

    const [stockIn, setStockIn] = useState([])

    const [stockOut, setStockOut] = useState([])

    const getReports = async () => {

        const stockRes = await axios.get(
            "http://localhost:5000/api/reports/available-stock"
        )

        const inRes = await axios.get(
            "http://localhost:5000/api/reports/stock-in"
        )

        const outRes = await axios.get(
            "http://localhost:5000/api/reports/stock-out"
        )

        setAvailableStock(stockRes.data.products)

        setStockIn(inRes.data.stockIn)

        setStockOut(outRes.data.stockOut)
    }

    useEffect(() => {

        getReports()

    }, [])

    return (

        <div>

            <Navbar />

            <div className="p-5">

                <div className="bg-white p-5 rounded shadow mb-10">

                    <h1 className="text-2xl font-bold mb-5">
                        Available Stock
                    </h1>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-black text-white">

                                <th className="p-3">Product</th>
                                <th>Stock</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                availableStock.map((product) => (

                                    <tr
                                        key={product._id}
                                        className="border text-center"
                                    >

                                        <td className="p-3">
                                            {product.productName}
                                        </td>

                                        <td>
                                            {product.quantityInStock}
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

                <div className="bg-white p-5 rounded shadow mb-10">

                    <h1 className="text-2xl font-bold mb-5">
                        Stock IN
                    </h1>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-black text-white">

                                <th className="p-3">Product</th>
                                <th>Quantity</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                stockIn.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="border text-center"
                                    >

                                        <td className="p-3">
                                            {item.product?.productName}
                                        </td>

                                        <td>
                                            {item.quantityMoved}
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h1 className="text-2xl font-bold mb-5">
                        Stock OUT
                    </h1>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-black text-white">

                                <th className="p-3">Product</th>
                                <th>Quantity</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                stockOut.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="border text-center"
                                    >

                                        <td className="p-3">
                                            {item.product?.productName}
                                        </td>

                                        <td>
                                            {item.quantityMoved}
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

export default Reports
