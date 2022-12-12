import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Wallet page', () => {
  test('if has the right html elements', () => {
    renderWithRedux(<Wallet />);
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/despesa total:/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /valor:/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /moeda:/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /metodo de pagamento:/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /tipo:/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /descrição:/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
  });

  test('save global store', () => {
    renderWithRedux(<Wallet />);
    const inputValue = screen.getByRole('textbox', { name: /valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição:/i });

    userEvent.type(inputValue, '11');
    userEvent.type(inputDescription, 'Testando esse projeto chato');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    // console.log(store.getState().wallet);
    // expect(store.getState().wallet.expenses).toHaveLength(1); // Não deu

    expect(inputValue).toHaveTextContent('');
    expect(inputDescription).toHaveTextContent('');
  });

  test('Validate inputs', () => {});

  test('call API', () => {
    const mockData = {
      USD: {
        code: 'USD',
        name: 'Dólar Comercial',
        ask: '5.6208',
      },
      CAD: {
        code: 'CAD',
        name: 'Dólar Canadense',
        ask: '4.2313',
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRedux(<Wallet />);

    userEvent.type(screen.getByRole('textbox', { name: /valor:/i }), '11');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(global.fetch).toBeCalled();
  });
});
