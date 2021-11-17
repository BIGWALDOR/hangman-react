import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import Header from "../components/Header"

describe('<Header />', () => {
  it('renders the header', () => {
    render(<Header />);
    const header = screen.getByRole('heading');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Hangman')
  });
})