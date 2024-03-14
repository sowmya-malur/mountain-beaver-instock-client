import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import WarehouseDetails from '../../components/WarehouseDetails/WarehouseDetails'; // Adjust import path as needed

const WarehouseDetailsPage = () => {
    const { warehouseId } = useParams(); // Adjust to use inventoryId from the route

    return (
        <div>
            <h2>Warehouse Details</h2>
            
            
            <WarehouseDetails warehouseId={warehouseId} />
        </div>
    );
};

export default WarehouseDetailsPage;
