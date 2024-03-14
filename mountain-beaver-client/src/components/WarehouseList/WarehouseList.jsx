import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WarehouseList.scss';
const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/warehouses/`)
        setWarehouses(response.data); 
      } catch (error) {
        console.error(`Error fetching warehouses`, error);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <div>
      <h2 className='warehouse__heading'>Warehouses</h2>
      <button className='warehouse__heading'></button>
      {warehouses.length > 0 ? (
        <table className='warehouse__table'>
          <thead>
            <tr>
              <th className='warehouse__cell'>Warehouse</th>
              <th className='warehouse__cell'>Address</th>
              <th className='warehouse__cell'>Contact Name</th>
              <th className='warehouse__cell'> Contact information</th>
              <th className='warehouse__cell'>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse, index) => (
              <tr key={index}>
                <td>{warehouse.warehouse_name}</td>
                <td>{warehouse.address}</td>
                <td>{warehouse.contact_name}</td>
                <td>{warehouse.contact_phone}
                <br/>{warehouse.contact_email}</td>
               
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
