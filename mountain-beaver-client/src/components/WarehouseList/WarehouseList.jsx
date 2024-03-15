import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WarehouseList.scss';
import { Link } from 'react-router-dom';
import Del from "../../assets/icons/delete_outline-24px.svg";
import Edit from "../../assets/icons/edit-24px.svg";
import Modal from "../Modal/Modal";
import AddWarehousePage from '../../pages/AddWarehousePage/AddWarehousePage';
import EditWarehousePage from '../../pages/EditWarehousePage/EditWarehousePage';
const WarehouseList = () => {

  const [showComponent, setComponent] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedWarehouse, setSelectedWarehouse] = useState(null); // State to store the selected war

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/warehouses/`)
      setWarehouses(response.data); 
      console.log("in fethwarehouse");
    } catch (error) {
      console.error(`Error fetching warehouses`, error);
    }
  };

  useEffect(() => {
    console.log("in useeffect");
    fetchWarehouses();
  }, [showComponent]);

  const handleClickDelete = (warehouse) => {
    setSelectedWarehouse(warehouse); // Set the selected warehouse for deletion
    setShowModal(true); // Show the modal
  };

  const handleConfirmDelete = () => {
    // Perform delete action here
    // After deletion, you can fetch updated list of warehouses if necessary
    setShowModal(false); // Hide the modal
  };

  const handleCancelDelete = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <>
    {!showComponent && (
       <div>
       <h2 className='warehouse__heading'>Warehouses</h2>
       <button className='warehouse__heading' onClick={() => setComponent('add-warehouse')}>+ Add New Warehouse</button>
       {/* <Link to="/add" ><button className='warehouse__heading'>+ Add Warehouse</button></Link> */}
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
                 {/* <img src={Del} onClick={() => handleClickDelete(warehouse)}/> */}
                  {/* <Link to={`/edit/:${index}`}><td>Edit</td></Link> */}
                  <img src={Del} onClick={() => handleClickDelete(warehouse)}/>
                 <img src={Edit} onClick={() => {
                  setComponent('edit-warehouse');
                  setSelectedWarehouse(warehouse)}}></img>
                
               </tr>
             ))}
           </tbody>
         </table>
       ) : (
         <p>No warehouses found.</p>
       )}
 
       {showModal && <Modal 
       name={selectedWarehouse.warehouse_name}
       type="warehouses"
       id={selectedWarehouse.id}
       setActive={setShowModal}
       fetchList={fetchWarehouses}
       />}
     </div>
    )}
    {showComponent === 'add-warehouse' && <AddWarehousePage handleClick={() => setComponent(false)} />}
    {showComponent === 'edit-warehouse' && <EditWarehousePage handleClick={() => setComponent(false)} warehouse={selectedWarehouse}/>}

    </>
   
  );
};

export default WarehouseList;
