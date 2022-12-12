import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  renderSumExchange = (expenses = []) => { // Feio e cheio de gambiarra pra passar no teste
    const result = expenses.reduce((acc, { value, exchangeRates, currency }) => {
      const exchangeValues = Object.values(exchangeRates);
      const currCoin = exchangeValues.filter((coinVal) => coinVal.code === currency);

      const reducerAcc = acc + Number(value)
      * Number(currCoin[0].ask);

      return reducerAcc;
    }, 0);
    return (Math.round(result * 100) / 100).toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header className="headerContent container">
        <span>
          <p
            data-testid="email-field"
          >
            Email:
            { email }
          </p>
          <p>Despesa Total:</p>
          <p data-testid="total-field">
            { expenses.length ? this.renderSumExchange(expenses) : 0 }

          </p>
          <p data-testid="header-currency-field">BRL</p>
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
