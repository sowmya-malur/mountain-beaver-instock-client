import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryList = () => {
  const [Inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/inventory/`);
        setInventories(response.data); 
      } catch (error) {
        console.error(`Error fetching inventories`, error);
      }
    };

    fetchInventories();
  }, []);

  return (
    <div>
      <h2>Inventories List</h2>
      {Inventories.length > 0 ? (
        <table>
          <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Created At</th>
            <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {Inventories.map((inventory, index) => (
                <tr key={inventory.id}>
                    <td>{inventory.description}</td>
                    <td>{inventory.category}</td>
                    <td>{inventory.status}</td>
                    <td>{inventory.quantity}</td>
                    <td>{inventory.created_at}</td>
                    <td>{inventory.updated_at}</td>
                </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Inventories found.</p>
      )}
    </div>
  );
};

export default InventoryList;
