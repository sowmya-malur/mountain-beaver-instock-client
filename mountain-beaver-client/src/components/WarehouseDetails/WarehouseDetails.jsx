import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WarehouseDetails = () => {
    let { warehouseId } = useParams(); // Using `/warehouse/:warehouseId`
    const [currentWarehouse, setCurrentWarehouse] = useState(null);
    
    if (!warehouseId) {
        warehouseId = '1'; // Default to '1' if no warehouseId is provided
    }
    
    useEffect(() => {
        const fetchWarehouseDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/warehouses/${warehouseId}`);
                setCurrentWarehouse(response.data);
            } catch (error) {
                console.error("Error fetching warehouse details:", error);
            }
        };

        fetchWarehouseDetails();
    }, [warehouseId]); // Rerun effect if warehouseId changes

    if (!currentWarehouse) {
        return <div>Loading...</div>; // Display while data is being fetched
    }

    // Assuming the API returns an object with attributes for warehouse items
    const { name, category, description } = currentWarehouse;

    return (
        <section className='warehouse-details'>
            <table>
                <thead>
                    <tr>
                        <th>Warehouse Address</th>
                        <th>Contact Name</th>
                        <th>Contact Info</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>

                        <td>{currentWarehouse.address}</td>
                        <td>{currentWarehouse.city}</td>
                        <td>{currentWarehouse.country}</td>
                        <td>{currentWarehouse.contact_name}<br/>
                        {currentWarehouse.contact_position}</td>
                        <td>{currentWarehouse.contact_phone}<br/>
                        {currentWarehouse.contact_email}</td>
                       
                    </tr>
                </tbody>
        </table>

        </section>
    );
};

export default WarehouseDetails;
