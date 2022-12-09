import Proptypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { requestExchangeAPI } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestExchangeAPI());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <Header />
        <div className="walletFormComponent container">
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              id="value-input"
            />
          </label>
          <label htmlFor="curr-input">
            Moeda:
            <select
              name=""
              id="curr-input"
              data-testid="currency-input"
            >
              { currencies.length && currencies.map((curr, i) => (
                <option
                  value=""
                  key={ i }
                >
                  { curr }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            <select
              name=""
              id="method-input"
              data-testid="method-input"
            >
              <option value="money"> Dinheiro </option>
              <option value="credit"> Cartão de crédito </option>
              <option value="debit"> Cartão de débito </option>
            </select>

          </label>

          <label htmlFor="tag-input">
            <select
              name=""
              id="tag-input"
              data-testid="tag-input"
            >
              <option value=""> Alimentação </option>
              <option value=""> Lazer </option>
              <option value=""> Trabalho </option>
              <option value=""> Transporte </option>
              <option value=""> Saúde </option>
            </select>

          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              id="description-input"
            />
          </label>
        </div>
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
