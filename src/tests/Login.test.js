import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import mockData from './helpers/mockData';

const PASSWORD_INPUT = 'password-input';

describe('Login page', () => {
  test('if has the right html elements', () => {
    renderWithRedux(<Login />);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
  });

  test('if button is disabed', () => {
    renderWithRedux(<Login />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    expect(btn).toBeDisabled();
    userEvent.click(btn);

    userEvent.type(emailInput, 'valorInvalido');
    userEvent.type(passwordInput, 'oi123');

    expect(btn).toBeDisabled();
  });

  test('if button is valid when type the right values', () => {
    renderWithRedux(<Login />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    expect(btn).toBeDisabled();

    userEvent.type(emailInput, 'email@mail.com');
    userEvent.type(passwordInput, 'senha123456789');

    expect(btn).not.toBeDisabled();
  });

  test('wallet page redirection and right route', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    expect(history.location.pathname).toBe('/');

    history.push('/carteira');

    expect(history.location.pathname).toBe('/carteira');
  });

  test.only('submit button', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Login />);

    const btn = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    expect(btn).toBeDisabled();

    userEvent.type(emailInput, 'email@mail.com');
    userEvent.type(passwordInput, 'senha123456789');

    // act(() => userEvent.click(btn));

    // waitFor(() => {
    //   expect(history.location.pathname).toBe('/carteira');
    // });
  });
});
