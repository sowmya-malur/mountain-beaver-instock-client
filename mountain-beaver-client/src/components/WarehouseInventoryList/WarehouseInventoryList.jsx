import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WarehouseInventoryList = () => {
    let { warehouseId } = useParams(); // Using `/warehouse/:warehouseId`
    const [currentWarehouseInventory, setCurrentWarehouseInventory] = useState([]);

    useEffect(() => {
        const fetchWarehouseDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/warehouses/${warehouseId}/inventories`);
                setCurrentWarehouseInventory(response.data); // Assuming this is an array of items
            } catch (error) {
                console.error("Error fetching warehouse details:", error);
            }
        };

        fetchWarehouseDetails();
    }, [warehouseId]); // Rerun effect if warehouseId changes

    if (!currentWarehouseInventory.length) {
        return <div>Loading...</div>; // Display while data is being fetched
    }

    return (
        <section className='warehouse-details'>
            <table>
                <thead>
                    <tr>
                        <th>INVENTORY ITEM</th>
                        <th>STATUS</th>
                        <th>CATEGORY</th>
                        <th>QUANTITY</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {currentWarehouseInventory.map((item, index) => (
                        <tr key={index}>
                            <td>{item.item_name}</td>
                            <td>{item.status}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default WarehouseInventoryList;
