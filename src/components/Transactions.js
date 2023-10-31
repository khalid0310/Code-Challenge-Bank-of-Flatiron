import React, { useState } from 'react';

function Transactions({ transactions, onDeleteTransaction }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filteredTransactions = transactions
    .filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      } else if (sortBy === 'description') {
        return a.description.localeCompare(b.description);
      }
      return 0;
    });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="transactions-container">
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label>
        Sort by:
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">--Select--</option>
          <option value="category">Category</option>
          <option value="description">Description</option>
        </select>
      </label>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
                {typeof transaction.amount === 'number'
                  ? transaction.amount.toFixed(2)
                  : transaction.amount}
              </td>
              <td>
                <button onClick={() => onDeleteTransaction(transaction.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
