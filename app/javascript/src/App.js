import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Warehouse from './pages/warehouse'
import WarehouseList from './pages/warehouses_list'

const App = () => (
  <>
    <h3>Warehouses</h3>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<WarehouseList />} />
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/warehouses/:warehouseId" element={<Warehouse />} />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
