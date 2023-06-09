const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EXCHANGE_API':
    return {
      ...state,
      currencies: [...action.payload],
    };
  case 'CURRENCE_COINPRICE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...action.payload],
    };
  case 'UPDATE_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'EDITNEWEXPENSE':
    return {
      ...state,
      expenses: action.payload,
      editor: false,
      idToEdit: '',
    };
  default:
    return state;
  }
};

export default wallet;
