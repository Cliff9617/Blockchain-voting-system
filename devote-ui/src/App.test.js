import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DeVote application', () => {
  render(<App />);
  const titleElement = screen.getByText(/DeVote Elections Management System/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders wallet connection section', () => {
  render(<App />);
  const walletTitle = screen.getByRole('heading', { name: /Connect Your Wallet/i });
  expect(walletTitle).toBeInTheDocument();
});

test('renders voting system description', () => {
  render(<App />);
  const description = screen.getByText(/Secure and Transparent Blockchain Voting/i);
  expect(description).toBeInTheDocument();
});
