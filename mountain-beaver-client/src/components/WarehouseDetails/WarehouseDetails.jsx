import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

/* const WarehouseDetails = () => {
  const { warehouseId } = useParams(); 
  const [warehouse, setWarehouse] = useState(null); 
  console.log(warehouseId);
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/warehouses/${warehouseId}`);
        setWarehouse(response.data);
      } catch (error) {
        console.error(`Error fetching warehouse with ID ${warehouseId}:`, error);
      }
    };

    if (warehouseId) { // Ensure warehouseId is defined before fetching
      fetchWarehouse();
    }
  }, [warehouseId]);

  if (!warehouse) return <div>Loading...</div>;

  return (
    <div>
      <h2>{warehouse.warehouse_name}</h2>
      <p>{warehouse.address}</p> 

    </div>
  );
};

export default WarehouseDetails; */
