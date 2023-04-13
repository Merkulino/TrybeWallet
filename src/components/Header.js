import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.scss';

class Header extends Component {
  renderSumExchange = (expenses) => {
    const result = expenses
      .reduce((acc, { value, currentCoinValue }) => acc + Number(value)
      * Number(currentCoinValue), 0);
    return (Math.round(result * 100) / 100).toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header className="headerContent">
        <span>
          <p
            data-testid="email-field"
          >
            Email:
            {' '}
            { email }
          </p>
          <span>
            <p>Despesa Total:</p>
            <p data-testid="total-field">
              { expenses.length
                ? this.renderSumExchange(expenses) : Math.round(0).toFixed(2) }

            </p>
            <p data-testid="header-currency-field">BRL</p>
          </span>
        </span>
        <h3>Despesas</h3>
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
