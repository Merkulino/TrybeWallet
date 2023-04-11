import Proptypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/walletForm.scss';

class WalletForm extends Component {
  render() {
    const { props, onHandleChange, submitFormValue, currencies } = this.props;
    const { value, currency,
      method, tag, description, editExchange } = props;
    return (
      <form className="container">
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
            name="value"
            onChange={ onHandleChange }
            value={ value }
          />
        </label>
        <label htmlFor="curr-input">
          Moeda:
          <select
            id="curr-input"
            data-testid="currency-input"
            name="currency"
            onChange={ onHandleChange }
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
            onChange={ onHandleChange }
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
            onChange={ onHandleChange }
            value={ tag }
          >
            <option value="Alimentação"> Alimentação </option>
            <option value="Lazer"> Lazer </option>
            <option value="Trabalho"> Trabalho </option>
            <option value="Transporte"> Transporte </option>
            <option value="Saúde"> Saúde </option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
            id="description-input"
            name="description"
            onChange={ onHandleChange }
            value={ description }
          />
        </label>
        <button
          type="button"
          onClick={ submitFormValue }
          data-testid="submitExpense"
        >
          { editExchange ? 'Editar Despesa' : 'Adicionar Despesa'}
        </button>
      </form>
    );
  }
}
WalletForm.propTypes = {
  currencies: Proptypes.array,
}.isRequired;

export default WalletForm;
