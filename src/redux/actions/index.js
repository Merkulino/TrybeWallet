const USER_LOGIN = 'USER_LOGIN';
const EXCHANGEAPI = 'EXCHANGE_API';
const CURRENCE_COINPRICE = 'CURRENCE_COINPRICE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
const EDITNEWEXPENSE = 'EDITNEWEXPENSE';

const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

const requestExchangeAPISuccesseful = (data) => ({
  type: EXCHANGEAPI,
  payload: data,
});

const requestPriceAPISuccessful = (data) => ({
  type: CURRENCE_COINPRICE,
  payload: data,
});

const deleteExpense = (expense) => {
  console.log(expense);
  return ({
    type: DELETE_EXPENSE,
    payload: expense,
  });
};

const updateState = (expense) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

const editNewExpense = (expensesUpdated) => (
  {
    type: EDITNEWEXPENSE,
    payload: expensesUpdated,
  }
);

function requestExchangeAPI() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const arrayKey = Object.keys(data);
    dispatch(requestExchangeAPISuccesseful(arrayKey.filter((key) => key !== 'USDT')));
  };
}

function requestPriceAPI(obj, id) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinPrice = await response.json();
    const objSave = {
      id,
      ...obj,
      exchangeRates: coinPrice,
    };
    dispatch(requestPriceAPISuccessful(objSave));
  };
}

export { userLogin, requestExchangeAPI, requestPriceAPI,
  deleteExpense, updateState, editNewExpense };
