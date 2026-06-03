// src/components/Navbar.jsx

import { Link } from "react-router-dom"

function Navbar() {

    return (

        <div className="bg-black text-white p-4 flex gap-5">

            <Link to="/products">Products</Link>

            <Link to="/warehouses">Warehouses</Link>

            <Link to="/transactions">Transactions</Link>

            <Link to="/reports">Reports</Link>

        </div>
    )
}

export default Navbar
