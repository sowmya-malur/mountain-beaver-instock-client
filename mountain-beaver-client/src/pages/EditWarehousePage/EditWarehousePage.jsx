import backarrow from "../../assets/icons/arrow_back-24px.svg";
import erroricon from "../../assets/icons/error-24px.svg";
import "../EditWarehousePage/EditWarehousePage.scss";

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function EditWarehousePage({ warehouse, handleClick }) {
  // TODO: will get warehouse object with id for the row that was clicked to edit from Warehouses Page
  // const warehouse = {
  //     id: 1,
  //     warehouse_name: "Manhattan",
  //     address: "503 Broadway",
  //     city: "New York",
  //     country: "USA",
  //     contact_name: "Parmin Aujla",
  //     contact_position: "Warehouse Manager",
  //     contact_phone: "+1 (646) 123-1234",
  //     contact_email: "paujla@instock.com",
  //   };
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
  const [notFound, setNotFound] = useState(false);
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

  useEffect(() => {
    if (warehouse) {
      setWareHouseName(warehouse.warehouse_name);
      setStreetAddress(warehouse.address);
      setCity(warehouse.city);
      setCountry(warehouse.country);
      setContactName(warehouse.contact_name);
      setPosition(warehouse.contact_position);
      setPhoneNumber(warehouse.contact_phone);
      setEmail(warehouse.contact_email);
    }
    
  }, [warehouse]);

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
      } else if (
        !/^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{4}$/.test(phoneNumber.trim())
      ) {
        // Verify for format: +1 (xxx) xxx-xxxx
        phoneRef.current.focus();
        formErrors.phoneNumber =
          "Invalid phone number format. Ex: +1 (xxx) xxx-xxxx";
      }
      if (email.trim() === "") {
        emailRef.current.focus();
        formErrors.email = errorMessage;
      } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
        emailRef.current.focus();
        formErrors.email = "Invalid email format. Ex: example@example.com";
      }

      // Update state with form errors
      if (Object.keys(formErrors).length !== 0) {
        setErrors(formErrors);
      }

      // If there are no errors, submit the form
      if (Object.keys(formErrors).length === 0) {
        const updateWareHouse = {
          warehouse_name: wareHouseName,
          address: streetAddress,
          city: city,
          country: country,
          contact_name: contactName,
          contact_position: position,
          contact_phone: phoneNumber,
          contact_email: email,
        };

        // PUT request to backend API
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${warehouse.id}`,
          updateWareHouse
        );

        if (response.status === 200) {
          console.log("Warehouse updated successfully"); //TODO:
          setNotFound(false);
          // Reset form fields and clear errors
          resetForm();
          handleClick(false);
          navigate("/");
         
        }
      }
    } catch (error) {
      // Handle any errors during the API call
      if (error.response && error.response.status === 404) {
        // If inventory item not found, set notFound state to true
        setNotFound(true);
        console.error("Warehouse not found");
      } else {
        console.error("Error updating warehouse", error);
      }
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
    <section className="edit-warehouse">
      <div className="wrapper">
        <div className="edit-warehouse__page-title">
          <Link to="/" className="edit-warehouse__arrow-back">
            <img src={backarrow} alt="back arrow icon" />
          </Link>
          <h1 className="edit-warehouse__title">Edit Warehouse</h1>
        </div>
        <form
          className="edit-warehouse__form"
          id="edit-warehouse-form"
          ref={formRef}
        >
          <div className="two-column-container">
            <div className="edit-warehouse__details">
              <h2 className="edit-warehouse__sub-title">Warehouse Details</h2>
              <label htmlFor="wareHouseName" className="edit-warehouse__label">
                Warehouse Name
              </label>
              <input
                type="text"
                name="wareHouseName"
                id="wareHouseName"
                placeholder="Warehouse Name"
                className={`edit-warehouse__field ${
                  (errors.wareHouseName || activeFields.wareHouseName) &&
                  "edit-warehouse__field--error"
                }`}
                value={wareHouseName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={nameRef}
              />
              {errors.wareHouseName && (
                <div className="edit-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.wareHouseName}
                </div>
              )}
              <label htmlFor="streetAddress" className="edit-warehouse__label">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                placeholder="Street Address"
                className={`edit-warehouse__field ${
                  (errors.streetAddress || activeFields.streetAddress) &&
                  "edit-warehouse__field--error"
                }`}
                value={streetAddress}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={addressRef}
              />
              {errors.streetAddress && (
                <div className="edit-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.streetAddress}
                </div>
              )}

              <label htmlFor="city" className="edit-warehouse__label">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                className={`edit-warehouse__field ${
                  (errors.city || activeFields.city) &&
                  "edit-warehouse__field--error"
                }`}
                value={city}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={cityRef}
              />
              {errors.city && (
                <div className="edit-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.city}
                </div>
              )}
              <label htmlFor="country" className="edit-warehouse__label">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                className={`edit-warehouse__field ${
                  (errors.country || activeFields.country) &&
                  "edit-warehouse__field--error"
                }`}
                value={country}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={countryRef}
              />
              {errors.country && (
                <div className="edit-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.country}
                </div>
              )}
            </div>
            <div className="edit-warehouse__contact">
              <h2 className="edit-warehouse__sub-title">Contact Details</h2>
              <label htmlFor="contactName" className="edit-warehouse__label">
                Contact Name
              </label>
              <input
                type="text"
                name="contactName"
                id="contactName"
                placeholder="Contact Name"
                className={`edit-warehouse__field ${
                  (errors.contactName || activeFields.contactName) &&
                  "edit-warehouse__field--error"
                }`}
                value={contactName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={contactRef}
              />
              {errors.contactName && (
                <div className="edit-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.contactName}
                </div>
              )}
              <label htmlFor="position" className="edit-warehouse__label">
                Position
              </label>
              <input
                type="text"
                name="position"
                id="position"
                placeholder="Position"
                className={`edit-warehouse__field ${
                  (errors.position || activeFields.position) &&
                  "edit-warehouse__field--error"
                }`}
                value={position}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={positionRef}
              />
              {errors.position && (
                <div className="edit-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.position}
                </div>
              )}
              <label htmlFor="phoneNumber" className="edit-warehouse__label">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                className={`edit-warehouse__field ${
                  (errors.phoneNumber || activeFields.phoneNumber) &&
                  "edit-warehouse__field--error"
                }`}
                value={phoneNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={phoneRef}
              />
              {errors.phoneNumber && (
                <div className="edit-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.phoneNumber}
                </div>
              )}
              <label htmlFor="email" className="edit-warehouse__label">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className={`edit-warehouse__field ${
                  (errors.email || activeFields.email) &&
                  "edit-warehouse__field--error"
                }`}
                value={email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={emailRef}
              />
              {errors.email && (
                <div className="edit-warehouse__error-message">
                  <img src={erroricon} alt="error icon" />
                  {errors.email}
                </div>
              )}
            </div>
          </div>
          <div className="edit-warehouse__buttons-container">
            <Link to="/" className="edit-warehouse__wrapper">
              <button id="cancel" className="edit-warehouse__secondary">
                Cancel
              </button>
            </Link>
            <button
              id="addWarehouse"
              className="edit-warehouse__cta"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
        {notFound ? (
          <div className="edit-warehouse__error-message edit-warehouse__error-message--align">
            <img src={erroricon} alt="error icon" />
            <p>Warehouse not found</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default EditWarehousePage;
