import { render, screen } from '@/test/test-utils'
import { AppearanceSettings } from './appearance-settings'
import { describe, it, expect } from '@jest/globals'
import renderer from 'react-test-renderer'

describe('AppearanceSettings', () => {
  it('renders theme section', () => {
    render(<AppearanceSettings />)
    expect(screen.getByText('Theme')).toBeInTheDocument()
    expect(screen.getByLabelText('Light')).toBeInTheDocument()
    expect(screen.getByLabelText('Dark')).toBeInTheDocument()
    expect(screen.getByLabelText('System')).toBeInTheDocument()
  })

  it('renders font size section', () => {
    render(<AppearanceSettings />)
    expect(screen.getByText('Font Size')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders color accent section', () => {
    render(<AppearanceSettings />)
    expect(screen.getByText('Color Accent')).toBeInTheDocument()
    const colorButtons = screen.getAllByRole('button', {
      name: /accent color$/i,
    })
    expect(colorButtons).toHaveLength(5) // Number of color options
  })

  it('matches snapshot', () => {
    const tree = renderer.create(<AppearanceSettings />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
