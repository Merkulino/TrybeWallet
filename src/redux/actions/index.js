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

const deleteExpense = (expensesArray, target) => {
  const stateUpdated = expensesArray
    .filter((expense) => expense.id !== Number(target.id));
  return ({
    type: DELETE_EXPENSE,
    payload: stateUpdated,
  });
};

const updateState = (expense) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

const editNewExpense = (expenses, currenceExchangeId, stateValues) => {
  const currentExpense = expenses
    .find((expense) => expense.id === Number(currenceExchangeId));

  const exchangeUpdated = { ...currentExpense, ...stateValues };

  const expensesUpdated = expenses
    .map((expens) => (expens.id === exchangeUpdated.id ? exchangeUpdated : expens));

  return ({
    type: EDITNEWEXPENSE,
    payload: expensesUpdated,
  });
};

function requestExchangeAPI() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const arrayKey = Object.keys(data);
    dispatch(requestExchangeAPISuccesseful(arrayKey.filter((key) => key !== 'USDT')));
  };
}

// Filter exchenge coinValue selected from user. ex USD to BRL -> 4.93
const currentCoin = (responseData, currency) => {
  const exchangeValues = Object.values(responseData);
  return exchangeValues.filter((coinVal) => coinVal.code === currency)[0].ask;
};

function requestPriceAPI(obj, id) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinPrice = await response.json();
    const objSave = {
      id,
      ...obj,
      exchangeRates: coinPrice,
      currentCoinValue: currentCoin(coinPrice, obj.currency),
    };
    dispatch(requestPriceAPISuccessful(objSave));
  };
}

export { userLogin, requestExchangeAPI, requestPriceAPI,
  deleteExpense, updateState, editNewExpense };
