import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';
import mockData from './helpers/mockData';
import WalletForm from '../components/WalletForm';

describe('Wallet page', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

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

    expect(inputValue).toHaveTextContent('');
    expect(inputDescription).toHaveTextContent('');
  });

  test('call API', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRedux(<Wallet />);

    userEvent.type(screen.getByRole('textbox', { name: /valor:/i }), '11');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(global.fetch).toBeCalled();
  });

  test('if contain table elements', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRedux(<Wallet />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(9);
    expect(screen.getByRole('columnheader', { name: /descrição/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /editar\/excluir/i })).toBeInTheDocument();
  });

  test('if has table elements and delete expense', async () => {
    const initialState = {
      user: {
        email: 'mail@mail.com', // string que armazena o email da pessoa usuária
      },
      wallet: {
        currencies: [], // array de string
        expenses: [{
          id: 0,
          value: '13',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          description: 'Teste',
          exchangeRates: {
            USD: { code: 'USD', codein: 'BRL', name: 'Dólar Americano/Real Brasileiro', ask: '5.3228' },
          },
        }], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
        editor: true, // valor booleano que indica de uma despesa está sendo editada
        idToEdit: '', // valor numérico que armazena o id da despesa que esta sendo editada
      },
    };

    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState });

    const btnEdit = screen.getByRole('button', { name: /editar/i });
    const btnDelete = screen.getByRole('button', { name: /apagar/i });
    const addEditBtn = screen.getByTestId('submitExpense');
    expect(screen.getByRole('cell', { name: /teste/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i })).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();
    expect(btnDelete).toBeInTheDocument();
    expect(addEditBtn).toBeInTheDocument();
    expect(store.getState()).toBe(initialState);
    expect(store.getState().wallet.expenses).toHaveLength(1);

    // Apagar despesa
    userEvent.click(btnDelete);
    expect(btnDelete).not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /teste/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /dólar americano\/real brasileiro/i })).not.toBeInTheDocument();

    expect(store.getState().wallet.expenses).toHaveLength(0);
  });

  test.only('edit expense', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByRole('textbox', { name: /valor:/i });
    const inputCoin = screen.getByRole('combobox', { name: /moeda:/i });
    const inputPayment = screen.getByRole('combobox', { name: /metodo de pagamento:/i });
    const inputType = screen.getByRole('combobox', { name: /tipo:/i });
    const inputDesc = screen.getByRole('textbox', { name: /descrição:/i });
    const btnEnciar = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(screen.queryByTestId('edit-btn')).not.toBeInTheDocument();

    userEvent.type(inputValue, '761');
    const usdOption = await screen.findByRole('option', { name: /usd/i });
    userEvent.selectOptions(inputCoin, usdOption);
    userEvent.selectOptions(inputPayment, screen.getByRole('option', { name: /dinheiro/i }));
    userEvent.selectOptions(inputType, screen.getByRole('option', { name: /trabalho/i }));
    userEvent.type(inputDesc, 'Agora vai');
    act(() => userEvent.click(btnEnciar));

    const btnEditar = await screen.findByTestId('edit-btn');
    expect(btnEditar).toBeInTheDocument();

    act(() => userEvent.click(btnEditar));

    // const addEditBtn = await screen.findByRole('button', { name: /editar despesa/i });
    await waitFor(() => {
      // const addEditBtn = screen.findByRole('button', { name: /editar despesa/i });

      const addEditBtn = screen.getByTestId('submitExpense');
      expect(addEditBtn).toHaveTextContent(/editar despesa/i);

      // expect(screen.getByRole('textbox', { name: /descrição:/i })).toBe('Agora vai');
    });
  });

  test('Wallet Form not used', () => {
    renderWithRouterAndRedux(<WalletForm />);
    expect(screen.getByText(/walletform/i)).toBeInTheDocument();
  });
});
