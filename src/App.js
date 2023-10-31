import React, { useState, useEffect } from 'react';
import './App.css';
import Transactions from './components/Transactions';
import TransactionForm from './components/TransactionForm';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const addTransaction = (newTransaction) => {
    // Add the new transaction to the top of the array
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (transactionId) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
    setTransactions(updatedTransactions);
  };

  return (
    <div className="App">
      <h1>Bank Transactions</h1>
      <TransactionForm onAddTransaction={addTransaction} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Transactions transactions={transactions} onDeleteTransaction={deleteTransaction} />
      )}
    </div>
  );
}

export default App;
