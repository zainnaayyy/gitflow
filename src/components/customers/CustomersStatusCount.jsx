import React from 'react';

const CustomersStatusCount = ({ customers }) => {
  // Initialize an object to store the counts
  const statusCounts = customers.reduce((counts, customer) => {
    // Extract the customer_status from each customer
    const { customer_status } = customer;

    // If the customer_status exists, increment the count for that status
    if (customer_status) {
      counts[customer_status] = (counts[customer_status] || 0) + 1;
    }

    return counts;
  }, {});

  // Now, statusCounts will contain the counts for each customer_status

  return (
    <div>
      <h2>Status Counts</h2>
      <ul>
        {Object.entries(statusCounts).map(([status, count]) => (
          <li key={status}>
            {status}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersStatusCount;
