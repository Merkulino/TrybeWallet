import React, { Component } from 'react';
import '../styles/table.css';

class Table extends Component {
  render() {
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
        </table>
      </div>
    );
  }
}

export default Table;
