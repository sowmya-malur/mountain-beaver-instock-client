import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Del from "../../assets/icons/delete_outline-24px.svg";
import Edit from "../../assets/icons/edit-24px.svg";
import Modal from "../Modal/Modal";
import AddInventoryItemPage from '../../pages/AddInventoryItemPage/AddInventoryItemPage';
import EditInventoryItem from '../../pages/EditInventoryItemPage/EditInventoryItemPage';
import InventoryDetails from '../../pages/InventoryDetails/InventoryDetails';

const InventoryList = () => {

  const [showComponent, setComponent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Inventories, setInventories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/inventories/`)
      setInventories(response.data); 
    } catch (error) {
      console.error(`Error fetching inventories`, error);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, [showComponent]);

  const handleClickDelete = (inventory) => {
    setSelectedInventory(inventory); // Set the selected warehouse for deletion
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
      <h2>Inventories List</h2>
      <button onClick={() => setComponent('add-inventory')}>+ Add Inventory</button>
      {Inventories.length > 0 ? (
        <table>
  <thead>
    <tr>
      <th>Item Name</th> {/* Assuming you intended to display this */}
      <th>Description</th>
      <th>Category</th>
      <th>Status</th>
      <th>Quantity</th>
      <th>Actions</th>
      {/* <th>Updated At</th> */}
    </tr>
  </thead>
  <tbody>
    {Inventories.map((inventory) => (
      <tr key={inventory.id}>
        <td onClick={() => {
                          setComponent("details-inventory");
                          setSelectedInventory(inventory);
                        }}>{inventory.item_name}</td> {/* Corrected to include Item Name */}
        <td>{inventory.description}</td>
        <td>{inventory.category}</td>
        <td>{inventory.status}</td>
        <td>{inventory.quantity}</td>
        <td><img src={Del} onClick={() => handleClickDelete(inventory)}/></td>
        <td><img src={Edit} onClick={() => {
            setComponent('edit-inventory');
            setSelectedInventory(inventory)}}/></td>
      </tr>
    ))}
  </tbody>
</table>
      ) : (
        <p>No Inventories found.</p>
      )}
       {showModal && <Modal 
       name={selectedInventory.item_name}
       type="inventories"
       id={selectedInventory.id}
       setActive={setShowModal}
       fetchList={fetchInventories}/>}
    </div>
    )}
    {showComponent === 'add-inventory' && <AddInventoryItemPage handleClick={() => setComponent(false)} />}
    {showComponent === 'edit-inventory' && <EditInventoryItem handleClick={() => setComponent(false)} inventory={selectedInventory}/>}
    {showComponent === "details-inventory" && (
        <InventoryDetails
          handleClick={() => setComponent(false)}
          inventoryId={selectedInventory.id}
        />
      )}
    </>
    
  );
};

export default InventoryList;
