import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import { act, render, waitFor } from '@testing-library/react'
import WarehouseList from '../warehouses_list'
import { BrowserRouter } from 'react-router-dom'

jest.mock('axios')

describe('WarehouseList', () => {
  it('displays fetched warehouses', async () => {
    const warehouses = [
      { id: 'abc123' }
    ]

    axios.get.mockResolvedValueOnce({ data: warehouses })
    const { findByText } = render(
      <WarehouseList />, { wrapper: BrowserRouter }
    )

    await waitFor(async () => {
      const warehouseLink1 = await findByText(`Warehouse ${warehouses[0].id}`)
      expect(warehouseLink1).toBeInTheDocument()
      expect(warehouseLink1).toHaveAttribute('href', '/warehouses/abc123')
    })
  })

  describe('when warehouse api returns empty response', () => {
    it('displays `no warehouses` text', async () => {
      axios.get.mockResolvedValueOnce({ data: [] })

      const { findByText } = render(
        <WarehouseList />
      )

      await waitFor(async () => {
        expect(await findByText('Warehouses list is empty')).toBeInTheDocument()
      })
    })
  })

  describe('when warehouse api fails', () => {
    const error = new Error('Boom!')

    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      axios.get.mockRejectedValueOnce(error)
    })

    it('displays `no warehouses` text', async () => {
      const { findByText } = render(
        <WarehouseList />
      )

      await waitFor(async () => {
        expect(await findByText('Warehouses list is empty')).toBeInTheDocument()
      })
    })

    it('logs error', async () => {
      await act(async () => await render(<WarehouseList />))

      expect(console.error).toBeCalledWith(error)
    })
  })
})
