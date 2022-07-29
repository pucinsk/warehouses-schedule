import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import Warehouse from '../warehouse'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../utils', () => {
  const originalModule = jest.requireActual('../../utils')

  return {
    __esModule: true,
    ...originalModule,
    csfrToken: jest.fn(() => 'abc123')
  }
})

jest.mock('axios')
console.error = jest.fn()

describe('Warehouse', () => {
  xit('displays fetched warehouse name', async () => {
    const warehouse = { id: 'abc123' }

    axios.get.mockResolvedValueOnce({ data: warehouse })
    axios.get.mockResolvedValueOnce({ data: [] })

    const { findByText } = render(
      <MemoryRouter initialEntries={['/time-slots/result']}>
        <Warehouse />
      </MemoryRouter>
    )

    await waitFor(async () => {
      expect(await findByText(`Book time at Warehouse ${warehouse.id}`)).toBeInTheDocument()
    })
  })

  describe('when warehouse is not found', () => {
    it('displays `warehouse is not found` message', () => {
      const error = new Error('Not found')

      axios.get.mockRejectedValueOnce(error)

      const { findByText } = render(
        <Warehouse />
      )

      waitFor(async () => {
        expect(await findByText('Warehouse not found')).toBeInTheDocument()
      })
    })
  })
})
