import backarrow from "../../assets/icons/arrow_back-24px.svg";
import "../AddWarehousePage/AddWarehousePage.scss";

// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddWarehousePage() {
  return (
    <section className="add-warehouse">
      <div className="add-warehouse__page-title">
        <Link to="/" className="add-warehouse__arrow-back">
          <img src={backarrow} alt="back arrow icon" />
        </Link>
        <h1 className="add-warehouse__title">Add New Warehouse</h1>
      </div>

      <form className="add-warehouse__form">
        <div className="two-column-container">
          <div className="add-warehouse__details">
            <h2 className="add-warehouse__sub-title">Warehouse Details</h2>
            <label htmlFor="warehouseName" className="add-warehouse__label">
              Warehouse Name
            </label>
            <input
              type="text"
              name="warehouseName"
              id="warehouseName"
              placeholder="Warehouse Name"
              className="add-warehouse__field"
            />
            <label htmlFor="streetAddress" className="add-warehouse__label">
              Street Address
            </label>
            <input
              type="text"
              name="streetAddress"
              id="streetAddress"
              placeholder="Street Address"
              className="add-warehouse__field"
            />
            <label htmlFor="city" className="add-warehouse__label">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              className="add-warehouse__field"
            />
            <label htmlFor="country" className="add-warehouse__label">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              className="add-warehouse__field"
            />
          </div>
          <div className="add-warehouse__contact">
            <h2 className="add-warehouse__sub-title">Contact Details</h2>
            <label htmlFor="contactName" className="add-warehouse__label">
              Contact Name
            </label>
            <input
              type="text"
              name="contactName"
              id="contactName"
              placeholder="Contact Name"
              className="add-warehouse__field"
            />
            <label htmlFor="position" className="add-warehouse__label">
              Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              placeholder="Position"
              className="add-warehouse__field"
            />
            <label htmlFor="phoneNumber" className="add-warehouse__label">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              className="add-warehouse__field"
            />
            <label htmlFor="email" className="add-warehouse__label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="add-warehouse__field"
            />
          </div>
        </div>
        <div className="add-warehouse__buttons-container">
          <Link to="/" className="add-warehouse__wrapper">
            <button id="cancel" className="add-warehouse__secondary">
              Cancel
            </button>
          </Link>
          <Link to="/">
            <button id="addWarehouse" className="add-warehouse__cta">
              + Add Warehouse
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
}

export default AddWarehousePage;
