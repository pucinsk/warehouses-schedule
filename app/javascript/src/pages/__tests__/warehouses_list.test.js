import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import { act, render, waitFor } from '@testing-library/react'
import WarehouseList from '../warehouses_list'

jest.mock('axios')

describe('WarehouseList', () => {
  it('displays fetched warehouses', async () => {
    const warehouses = [
      { id: 'abc123' },
      { id: 'def456' }
    ]

    axios.get.mockResolvedValueOnce({ data: warehouses })
    const { findByText } = render(
      <WarehouseList />
    )

    await waitFor(async () => {
      expect(await findByText(`Warehouse ${warehouses[0].id}`)).toBeInTheDocument()
      expect(await findByText(`Warehouse ${warehouses[1].id}`)).toBeInTheDocument()
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
      const errorLogSpy = jest.spyOn(console, 'error')

      await act(async () => await render(<WarehouseList />))

      expect(errorLogSpy).toBeCalledWith(error)
    })
  })
})
