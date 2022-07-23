import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import Warehouse from '../warehouse'

jest.mock('axios')
console.error = jest.fn()

describe('Warehouse', () => {
  it('displays fetched warehouse name', async () => {
    const warehouse = { id: 'abc123' }

    axios.get.mockResolvedValueOnce({ data: warehouse })

    const { findByText } = render(
      <Warehouse />
    )

    await waitFor(async () => {
      expect(await findByText(`Warehouse ${warehouse.id}`)).toBeInTheDocument()
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
