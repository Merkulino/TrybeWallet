import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <div className="table-content container">
        <table className="expenses-table">
          <tr className="tableCells">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
          <tbody>
            { expenses.map((expense) => {
              // const exchangeValues = Object.values(expense.exchangeRates);
              const currencyExchange = expense.exchangeRates[expense.currency];
              // const convertedValue = Math.round((expense.value * currencyExchange.ask) * 100) / 100).toFixed(2);
              console.log(currencyExchange);
              return (
                <tr
                  className="tableCells"
                  key={ expense.id }
                >
                  <td>
                    { expense.description }
                  </td>
                  <td>
                    { expense.tag }
                  </td>
                  <td>
                    { expense.method }
                  </td>
                  <td>
                    { (Math.round(expense.value * 100) / 100).toFixed(2) }
                  </td>
                  <td>
                    { currencyExchange.name }
                  </td>
                  <td>
                    { (Math.round(currencyExchange.ask * 100) / 100).toFixed(2) }
                  </td>
                  <td>
                    { (Math.round((expense.value * currencyExchange.ask) * 100) / 100)
                      .toFixed(2) }
                  </td>
                  <td>
                    Real
                  </td>
                  <td>
                    { expense.id }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: Proptypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(Table);
