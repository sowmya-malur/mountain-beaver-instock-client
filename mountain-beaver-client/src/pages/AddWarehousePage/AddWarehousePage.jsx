import backarrow from "../../assets/icons/arrow_back-24px.svg";
import erroricon from "../../assets/icons/error-24px.svg";
import "../AddWarehousePage/AddWarehousePage.scss";

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

function AddWarehousePage({handleClick}) {
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
  const [activeFields, setActiveFields] = useState({
    wareHouseName: false,
    streetAddress: false,
    city: false,
    country: false,
    contactName: false,
    position: false,
    phoneNumber: false,
    email: false,
  });

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

  // Event handler for focusing on a form field
  const handleFocus = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: true }));
  };

  // Event handler for blurring out of a form field
  const handleBlur = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: false }));
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
      } else if (!/^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{4}$/.test(phoneNumber.trim())) {
        // Verify for format: +1 (xxx) xxx-xxxx
        phoneRef.current.focus();
        formErrors.phoneNumber = "Invalid phone number format.";
      }
      if (email.trim() === "") {
        emailRef.current.focus();
        formErrors.email = errorMessage;
      } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
        emailRef.current.focus();
        formErrors.email = "Invalid email format";
      }

      // Update state with form errors
      if (Object.keys(formErrors).length !== 0) {
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
          contact_phone: phoneNumber,
          contact_email: email,
        };

        // POST request to backend API
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/`,
          newWareHouse
        );

        if (response.status === 201) {
          alert("New warehouse added successfully");

          // Reset form fields and clear errors
          resetForm();
          handleClick(false);
          navigate("/");
        } else if (response.status === 404) {
          alert("Error adding new warehouse.");
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
                  (errors.wareHouseName || activeFields.wareHouseName) &&
                  "add-warehouse__field--error"
                }`}
                value={wareHouseName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                  (errors.streetAddress || activeFields.streetAddress) &&
                  "add-warehouse__field--error"
                }`}
                value={streetAddress}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                  (errors.city || activeFields.city) &&
                  "add-warehouse__field--error"
                }`}
                value={city}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                  (errors.country || activeFields.country) &&
                  "add-warehouse__field--error"
                }`}
                value={country}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                  (errors.contactName || activeFields.contactName) &&
                  "add-warehouse__field--error"
                }`}
                value={contactName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                  (errors.position || activeFields.position) &&
                  "add-warehouse__field--error"
                }`}
                value={position}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                  (errors.phoneNumber || activeFields.phoneNumber) &&
                  "add-warehouse__field--error"
                }`}
                value={phoneNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                  (errors.email || activeFields.email) &&
                  "add-warehouse__field--error"
                }`}
                value={email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
