import backarrow from "../../assets/icons/arrow_back-24px.svg";
import erroricon from "../../assets/icons/error-24px.svg";
import "../AddWarehousePage/AddWarehousePage.scss";

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

function AddWarehousePage() {
  // Initialize hooks
  const navigate = useNavigate();
  const errorMessage = "This field is required";

  // Set states for all the form fields and errors
  const [wareHouseName, setWareHouseName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contactName, setContactName] = useState("");
  const [position, setPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  // Set refs for all the form fields to focus
  const formRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const contactRef = useRef();
  const positionRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  // Event handler for form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Set state based on input field name
    switch (name) {
      case "wareHouseName":
        setWareHouseName(value);
        break;
      case "streetAddress":
        setStreetAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "contactName":
        setContactName(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }

    // Clear errors and hide error message when the user enters a value
    if (value.trim() !== "") {
      setErrors({});
    }
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // Initialize form errors object
      let formErrors = {};

      // Check the values from the form. If empty, set the error message
      if (wareHouseName.trim() === "") {
        nameRef.current.focus();
        formErrors.wareHouseName = errorMessage;
      }
      if (streetAddress.trim() === "") {
        addressRef.current.focus();
        formErrors.streetAddress = errorMessage;
      }
      if (city.trim() === "") {
        cityRef.current.focus();
        formErrors.city = errorMessage;
      }
      if (country.trim() === "") {
        countryRef.current.focus();
        formErrors.country = errorMessage;
      }
      if (contactName.trim() === "") {
        contactRef.current.focus();
        formErrors.contactName = errorMessage;
      }
      if (position.trim() === "") {
        positionRef.current.focus();
        formErrors.position = errorMessage;
      }
      if (phoneNumber.trim() === "") {
        phoneRef.current.focus();
        formErrors.phoneNumber = errorMessage;
      }
      if (email.trim() === "") {
        emailRef.current.focus();
        formErrors.email = errorMessage;
      }

      // Update state with form errors
      if (formErrors.length !== 0) {
        setErrors(formErrors);
      }

      // If there are no errors, submit the form
      if (Object.keys(formErrors).length === 0) {
        const newWareHouse = {
          warehouse_name: wareHouseName,
          address: streetAddress,
          city: city,
          country: country,
          contact_name: contactName,
          contact_position: position,
          contact_phone: "+1 (646) 123-1234",
          contact_email: "paujla@instock.com",
        };

        // POST request to backend API
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/warehouses/`,
          newWareHouse
        );

        if (response.status === 201) {
          alert("New warehouse added successfully");

          // Reset form fields and clear errors
          resetForm();

          navigate("/");
        } else if (response.status === 404) {
          alert("Error adding new warhouse.");
        }
      }
    } catch (error) {
      console.error("Error adding new warehouse:", error);
    }
  };

  // Function to reset form fields and clear errors
  const resetForm = () => {
    setWareHouseName("");
    setStreetAddress("");
    setCity("");
    setCountry("");
    setContactName("");
    setPosition("");
    setPhoneNumber("");
    setEmail("");

    // Clear errors
    setErrors({});
  };

  return (
    <section className="add-warehouse">
      <div className="wrapper">
        <div className="add-warehouse__page-title">
          <Link to="/" className="add-warehouse__arrow-back">
            <img src={backarrow} alt="back arrow icon" />
          </Link>
          <h1 className="add-warehouse__title">Add New Warehouse</h1>
        </div>

        <form
          className="add-warehouse__form"
          id="add-warehouse-form"
          ref={formRef}
        >
          <div className="two-column-container">
            <div className="add-warehouse__details">
              <h2 className="add-warehouse__sub-title">Warehouse Details</h2>
              <label htmlFor="wareHouseName" className="add-warehouse__label">
                Warehouse Name
              </label>
              <input
                type="text"
                name="wareHouseName"
                id="wareHouseName"
                placeholder="Warehouse Name"
                className={`add-warehouse__field ${
                  errors.wareHouseName && "add-warehouse__field--error"
                }`}
                value={wareHouseName}
                onChange={handleChange}
                ref={nameRef}
              />
              {errors.wareHouseName && (
                <div className="add-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.wareHouseName}
                </div>
              )}
              <label htmlFor="streetAddress" className="add-warehouse__label">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                placeholder="Street Address"
                className={`add-warehouse__field ${
                  errors.streetAddress && "add-warehouse__field--error"
                }`}
                value={streetAddress}
                onChange={handleChange}
                ref={addressRef}
              />
              {errors.streetAddress && (
                <div className="add-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.streetAddress}
                </div>
              )}

              <label htmlFor="city" className="add-warehouse__label">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                className={`add-warehouse__field ${
                  errors.city && "add-warehouse__field--error"
                }`}
                value={city}
                onChange={handleChange}
                ref={cityRef}
              />
              {errors.city && (
                <div className="add-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.city}
                </div>
              )}
              <label htmlFor="country" className="add-warehouse__label">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                className={`add-warehouse__field ${
                  errors.country && "add-warehouse__field--error"
                }`}
                value={country}
                onChange={handleChange}
                ref={countryRef}
              />
              {errors.country && (
                <div className="add-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.country}
                </div>
              )}
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
                className={`add-warehouse__field ${
                  errors.contactName && "add-warehouse__field--error"
                }`}
                value={contactName}
                onChange={handleChange}
                ref={contactRef}
              />
              {errors.contactName && (
                <div className="add-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.contactName}
                </div>
              )}
              <label htmlFor="position" className="add-warehouse__label">
                Position
              </label>
              <input
                type="text"
                name="position"
                id="position"
                placeholder="Position"
                className={`add-warehouse__field ${
                  errors.position && "add-warehouse__field--error"
                }`}
                value={position}
                onChange={handleChange}
                ref={positionRef}
              />
              {errors.position && (
                <div className="add-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.position}
                </div>
              )}
              <label htmlFor="phoneNumber" className="add-warehouse__label">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                className={`add-warehouse__field ${
                  errors.phoneNumber && "add-warehouse__field--error"
                }`}
                value={phoneNumber}
                onChange={handleChange}
                ref={phoneRef}
              />
              {errors.phoneNumber && (
                <div className="add-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.phoneNumber}
                </div>
              )}
              <label htmlFor="email" className="add-warehouse__label">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className={`add-warehouse__field ${
                  errors.email && "add-warehouse__field--error"
                }`}
                value={email}
                onChange={handleChange}
                ref={emailRef}
              />
              {errors.email && (
                <div className="add-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.email}
                </div>
              )}
            </div>
          </div>
          <div className="add-warehouse__buttons-container">
            <Link to="/" className="add-warehouse__wrapper">
              <button id="cancel" className="add-warehouse__secondary">
                Cancel
              </button>
            </Link>
            <button
              id="addWarehouse"
              className="add-warehouse__cta"
              onClick={handleSubmit}
            >
              + Add Warehouse
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddWarehousePage;
