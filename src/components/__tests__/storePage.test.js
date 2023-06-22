import { render, screen, cleanup } from "@testing-library/react"
// import TestComponent from "path-to-test-component";
import CardsDisplay from "../ProductPage/CardsDisplay/index"
import BallCard from "../ProductPage/BallCard/index"
import { MemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"

describe("tests for store page", () => {
  afterEach(()=> {
    cleanup()
  })

  test("check if card display component is on screen", () => {
    render(<MemoryRouter><CardsDisplay /></MemoryRouter>)
    const cardsDisplay = screen.getByTestId("cards-display")
    expect(cardsDisplay).toBeInTheDocument()
  })

  test("checks if ball cards are on screen", () => {
    render(<MemoryRouter><CardsDisplay /></MemoryRouter>)
    const ballCards = screen.getAllByTestId("ball-card")
    expect(ballCards.length).toBe(18)
  })

  test("checks for ball images", () => {
    render(<MemoryRouter><CardsDisplay /></MemoryRouter>)
    const ballImages = screen.getAllByAltText("ball")
    expect(ballImages.length).toBe(18)
  })

  test("checks for ball inner elements", () => {
    render(<MemoryRouter><BallCard /></MemoryRouter>)
    const ballImage = screen.getByAltText(/ball/i)
    const input = screen.getByRole('spinbutton')
    const makeTheBasketBtn = screen.getByRole('button', {
      name: /make the basket/i
    })

    expect(ballImage).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(makeTheBasketBtn).toBeInTheDocument()
  })

  test("check if 'make the basket' button increases cart count", () => {
    const user = userEvent.setup()

    render(<MemoryRouter><CardsDisplay /></MemoryRouter>)
    const count = screen.getByTestId("count-display")
    const qtyInput = screen.getByTestId("qty-input")
    const makeTheBasketBtn = screen.getByRole('button', {
      name: /make the basket/i
    })

    const expectedCount = parseInt(count.textContent) + parseInt(qtyInput.value)

    user.click(makeTheBasketBtn)
    expect(count.textContent).toBe(toString(expectedCount))
  })
})