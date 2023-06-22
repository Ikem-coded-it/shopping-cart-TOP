import { render, screen, cleanup } from "@testing-library/react"
import Main from "../LandingPage/Main/index";
import NavBar from "../LandingPage/NavBar/index";
import Footer from "../LandingPage/Footer/index";
import { MemoryRouter } from "react-router-dom"

describe("navbar tests", () => {
  afterEach(() => {
    cleanup()
  })

  test("checks if navbar is on screen", () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>)
    const navBar = screen.getByTestId("navbar")
    expect(navBar).toBeInTheDocument()
  })

  test("checks for 'BallerStore'", () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>)
    const BallerStore = screen.getByText(/BallerStore/i)
    expect(BallerStore).toBeInTheDocument()
  })

  test("checks for 'links'", () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>)
    const Home = screen.getByText(/Home/i)
    const Store = screen.getByText(/Store/i)
    const Contact = screen.getByText(/Contact/i)
    expect(Home).toBeInTheDocument()
    expect(Store).toBeInTheDocument()
    expect(Contact).toBeInTheDocument()
  })

})

describe('landing page', () => {
  afterEach(() => {
    cleanup()
  })

  test("checks if landing page is on screen", () => {
    render(<MemoryRouter><Main /></MemoryRouter>)
    const mainElement = screen.getByTestId("landing")
    expect(mainElement).toBeInTheDocument()
  })

  test("checks for 'Get some balls' button", () => {
    render(<MemoryRouter><Main /></MemoryRouter>)
    const button = screen.getByRole('button', {
      name: /get some balls/i
    })

    expect(button).toBeInTheDocument()
  })

  test("checks for 'welcome'", () => {
    render(<MemoryRouter><Main /></MemoryRouter>)
    const welcome = screen.getByText(/Welcome/i)
    expect(welcome).toBeInTheDocument()
  })

  test("checks for 'Ready to take your game to the next level?'", () => {
    render(<MemoryRouter><Main /></MemoryRouter>)
    const readyMessage = screen.getByText(/Ready to take your game to the next level?/i)
    expect(readyMessage).toBeInTheDocument()
  })
})

describe("footer tests", () => {
  afterEach(() => {
    cleanup()
  })
  test("check if footer shows", () => {
    render(<MemoryRouter><Footer /></MemoryRouter>)
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument()
  })

  test("check if tag shows", () => {
    render(<MemoryRouter><Footer /></MemoryRouter>)
    const tag = screen.getByText(/ikem\-coded\-it 2023/i)
    expect(tag).toBeInTheDocument()
  })
})