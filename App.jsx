// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Product from "./pages/Product"
import Warehouse from "./pages/Warehouse"
import Transaction from "./pages/Transaction"
import Reports from "./pages/Reports"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/products" element={<Product />} />

        <Route path="/warehouses" element={<Warehouse />} />

        <Route path="/transactions" element={<Transaction />} />

        <Route path="/reports" element={<Reports />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
