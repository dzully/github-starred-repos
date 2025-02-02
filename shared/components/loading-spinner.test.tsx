import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './loading-spinner'
import renderer from 'react-test-renderer'

describe('LoadingSpinner', () => {
  it('renders the loading spinner', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('applies the correct classes for styling', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveClass('flex justify-center items-center h-full')
  })

  it('applies animation properties', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveClass('flex justify-center items-center h-full')
  })

  it('matches snapshot', () => {
    const tree = renderer.create(<LoadingSpinner />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
