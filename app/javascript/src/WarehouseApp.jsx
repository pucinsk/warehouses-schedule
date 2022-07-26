import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Warehouse from './pages/warehouse'
import WarehouseList from './pages/warehouses_list'

import 'bootstrap/scss/bootstrap.scss'
import './styles.scss'

const WarehouseApp = () => (
  <>
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto ms-md-5 text-dark text-decoration-none">
        <span className="fs-4">Warehouses Schedule</span>
      </a>
      <ul className="nav nav-pills">
        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
      </ul>
    </header>
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<WarehouseList />} />
          <Route path="/warehouses" element={<WarehouseList />} />
          <Route path="/warehouses/:warehouseId/*" element={<Warehouse />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
)

export default WarehouseApp
