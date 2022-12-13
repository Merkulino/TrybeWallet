import Proptypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import { requestExchangeAPI, requestPriceAPI } from '../redux/actions';
import store from '../redux/store';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class Wallet extends React.Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestExchangeAPI());
  }

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitFormValue = () => {
    const { wallet } = store.getState();
    const expenseID = wallet.expenses.length;
    const { dispatch } = this.props;
    dispatch(requestPriceAPI(this.state, expenseID));
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { value, currency,
      method, tag, description } = this.state;
    const { currencies } = this.props;

    return (
      <div>
        <Header />
        <form className="walletFormComponent container">
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              id="value-input"
              name="value"
              onChange={ this.onHandleChange }
              value={ value }
            />
          </label>
          <label htmlFor="curr-input">
            Moeda:
            <select
              id="curr-input"
              data-testid="currency-input"
              name="currency"
              onChange={ this.onHandleChange }
              value={ currency }
            >
              { currencies.length && currencies.map((curr, i) => (
                <option
                  key={ i }
                >
                  { curr }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Metodo de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              onChange={ this.onHandleChange }
              value={ method }
            >
              <option value="Dinheiro"> Dinheiro </option>
              <option value="Cartão de crédito"> Cartão de crédito </option>
              <option value="Cartão de débito"> Cartão de débito </option>
            </select>

          </label>

          <label htmlFor="tag-input">
            Tipo:
            <select
              id="tag-input"
              data-testid="tag-input"
              name="tag"
              onChange={ this.onHandleChange }
              value={ tag }
            >
              <option value="Alimentação"> Alimentação </option>
              <option value="Lazer"> Lazer </option>
              <option value="Trabalho"> Trabalho </option>
              <option value="Transporte"> Transporte </option>
              <option value="Saude"> Saúde </option>
            </select>

          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              id="description-input"
              name="description"
              onChange={ this.onHandleChange }
              value={ description }
            />
          </label>
          <button
            type="button"
            onClick={ this.submitFormValue }
          >
            Adicionar Despesa
          </button>
        </form>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: Proptypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(Wallet);
