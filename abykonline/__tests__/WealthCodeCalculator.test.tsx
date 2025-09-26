/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { WealthCodeCalculator } from '@/components/WealthCodeCalculator'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
})

describe('WealthCodeCalculator', () => {
  const mockPush = jest.fn()
  const mockOnBack = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  it('renders calculator form', () => {
    render(<WealthCodeCalculator onBack={mockOnBack} />)
    
    expect(screen.getByText('מחשבון קוד העושר')).toBeInTheDocument()
    expect(screen.getByTestId('day-input')).toBeInTheDocument()
    expect(screen.getByTestId('month-input')).toBeInTheDocument()
    expect(screen.getByTestId('year-input')).toBeInTheDocument()
  })

  it('validates date input correctly', () => {
    render(<WealthCodeCalculator onBack={mockOnBack} />)
    
    const dayInput = screen.getByTestId('day-input')
    const monthInput = screen.getByTestId('month-input')
    const yearInput = screen.getByTestId('year-input')
    
    fireEvent.change(dayInput, { target: { value: '15' } })
    fireEvent.change(monthInput, { target: { value: '06' } })
    fireEvent.change(yearInput, { target: { value: '1990' } })
    
    expect(dayInput).toHaveValue('15')
    expect(monthInput).toHaveValue('06')
    expect(yearInput).toHaveValue('1990')
  })

  it('calls onBack when back button is clicked', () => {
    render(<WealthCodeCalculator onBack={mockOnBack} />)
    
    const backButton = screen.getByText('חזרה')
    fireEvent.click(backButton)
    
    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })
})