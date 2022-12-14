import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';
import mockData from './helpers/mockData';
import WalletForm from '../components/WalletForm';

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

  test('if has table elements', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
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
        editor: false, // valor booleano que indica de uma despesa está sendo editada
        idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
      },
    };

    renderWithRedux(<Wallet />, { initialState });
    userEvent.type(screen.getByRole('textbox', { name: /valor:/i }), '10');
    userEvent.type(screen.getByRole('textbox', { name: /descrição:/i }), 'Nova despesa');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(screen.getByRole('textbox', { name: /valor:/i })).toHaveTextContent('');
    await waitFor(async () => {
      const btnEdit = screen.getByRole('button', { name: /editar/i });
      const btnDelete = screen.getByRole('button', { name: /apagar/i });
      expect(screen.getByRole('cell', { name: /teste/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i })).toBeInTheDocument();
      expect(btnEdit).toBeInTheDocument();
      expect(btnDelete).toBeInTheDocument();
    });
    const btnDelete = screen.getByRole('button', { name: /apagar/i });

    userEvent.click(btnDelete);
    expect(btnDelete).not.toBeInTheDocument();
  });

  test.only('the right values on expanse table element', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const inputValue = screen.getByRole('textbox', { name: /valor:/i });
    const inputDesc = screen.getByRole('textbox', { name: /descrição:/i });
    const btnEnciar = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '69');
    userEvent.type(inputDesc, 'Agora vai essa merda');
    act(() => userEvent.click(btnEnciar));

    const btnEditar = await screen.findByTestId('edit-btn');
    act(() => userEvent.click(btnEditar));

    userEvent.type(inputDesc, 'Vamo ver');

    await waitFor(() => {
      // expect(screen.getByRole('edit-btn')).toBeInTheDocument();
      act(() => {
        userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
      });
    });

    // act(() => userEvent.click(screen.findByRole('button', { name: /editar despesa/i })));

    // waitFor(() => {
    //   expect(screen.findByText(/vamo ver/i)).toBeInTheDocument();
    // });
  });

  test('wallet form not used', () => {
    renderWithRouterAndRedux(<WalletForm />);
    expect(screen.getByText(/WalletForm/i)).toBeInTheDocument();
  });

  test('edit expense', async () => {
  });
});
