import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/warehouses/`);
        setWarehouses(response.data); 
      } catch (error) {
        console.error(`Error fetching warehouses`, error);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <div>
      <h2>Warehouses List</h2>
      {warehouses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Warehouse Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Contact_name</th>
              <th>Contact_position</th>
              <th>Contact_phone</th>
              <th>Contact_email</th>
              
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse, index) => (
              <tr key={index}>
                <td>{warehouse.warehouse_name}</td>
                <td>{warehouse.address}</td>
                <td>{warehouse.city}</td>
                <td>{warehouse.country}</td>
                <td>{warehouse.contact_name}</td>
                <td>{warehouse.contact_position}</td>
                <td>{warehouse.contact_phone}</td>
                <td>{warehouse.contact_email}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No warehouses found.</p>
      )}
    </div>
  );
};

export default WarehouseList;
