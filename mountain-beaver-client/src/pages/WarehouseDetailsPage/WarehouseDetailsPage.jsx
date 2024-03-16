import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import WarehouseDetails from '../../components/WarehouseDetails/WarehouseDetails'; // Adjust import path as needed
import WarehouseInventoryList from '../../components/WarehouseInventoryList/WarehouseInventoryList';

const WarehouseDetailsPage = () => {
    const { warehouseId } = useParams(); // Adjust to use inventoryId from the route

    return (
        <div>
            <h2>Warehouse Details</h2>
            
            
            <WarehouseDetails warehouseId={warehouseId} />
            <WarehouseInventoryList/>
        </div>
    );
};

export default WarehouseDetailsPage;
