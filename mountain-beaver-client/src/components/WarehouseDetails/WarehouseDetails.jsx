import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./WarehouseDetails.scss";

const WarehouseDetails = () => {
    let { warehouseId } = useParams();
    const [currentWarehouse, setCurrentWarehouse] = useState(null);

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
    }, [warehouseId]);

    if (!currentWarehouse) {
        return <div>Loading...</div>;
    }

    return (
        <section className='warehouse-details'>
            <div className='warehouse-details__row'>
                <div className='warehouse-details__cell warehouse-details__cell--full'>
                    <p className='warehouse-details__label'>Warehouse Address:</p>
                    <p>{currentWarehouse.address}, {currentWarehouse.city}, {currentWarehouse.country}</p>
                </div>
                <div className='warehouse-details__cell warehouse-details__cell--half'>
                    <p className='warehouse-details__label'>Contact Name:</p><p>{currentWarehouse.contact_name}</p>
                    <p>{currentWarehouse.contact_position}</p>
                </div>
                <div className='warehouse-details__cell warehouse-details__cell--half'>
                    <p className='warehouse-details__label'>Contact Information:</p>
                    <p>{currentWarehouse.contact_phone}</p>
                    <p>{currentWarehouse.contact_email}</p>
                </div>
            </div>
        </section>
    );
};

export default WarehouseDetails;
