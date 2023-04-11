import Proptypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { requestExchangeAPI, requestPriceAPI, editNewExpense } from '../redux/actions';
import store from '../redux/store';
import '../styles/walletForm.scss';

const INITIAL_STATE = {
  idEdit: '',
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  editExchange: false,
};

class Wallet extends React.Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestExchangeAPI());
  }

  componentDidUpdate(prevProps) {
    const { editor } = this.props;
    if (editor && editor !== prevProps.editor) {
      this.updateExpense();
    }
  }

  updateExpense = () => {
    const { expenses, idToEdit } = this.props;
    const currentExpense = expenses.find((expense) => expense.id === Number(idToEdit));

    return this.setState({
      idEdit: idToEdit,
      value: currentExpense.value,
      currency: currentExpense.currency,
      method: currentExpense.method,
      tag: currentExpense.tag,
      description: currentExpense.description,
      editExchange: true,
    });
  };

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitFormValue = async () => {
    const { idEdit, editExchange, value, currency,
      method, tag, description } = this.state;
    const { dispatch } = this.props;

    if (editExchange) {
      const { expenses } = this.props;
      const obj = { value, currency, method, tag, description };
      dispatch(editNewExpense(expenses, idEdit, obj));
    } else {
      const { wallet } = store.getState();
      const expenseID = wallet.expenses.length;
      dispatch(requestPriceAPI(
        {
          value,
          currency,
          method,
          tag,
          description,
        },
        expenseID,
      ));
    }
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <Header />
        <div className="walletFormComponent">
          <WalletForm
            props={ this.state }
            currencies={ currencies }
            onHandleChange={ this.onHandleChange }
            submitFormValue={ this.submitFormValue }
          />
          <Table />
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
