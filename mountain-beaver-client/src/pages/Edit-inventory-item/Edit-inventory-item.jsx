import "./Edit-inventory-item.scss";
import Arrow from "../../assets/icons/arrow_back-24px.svg";
import ArrowDown from "../../assets/icons/arrow_drop_down-24px.svg";

function EditInventoryItem() {
  return (
    <>
      <section className="inv">
        <div className="inv__full-wrapper">
          <div className="inv__title">
            <img src={Arrow} alt="arrow back logo" className="inv__logo" />
            <h1 className="inv__text"> Edit Inventory Item</h1>
          </div>
          <div className="inv__container">
            <div className="inv__details">
              <h2 className="inv__details-title">Item Details</h2>
              <h3 className="inv__details-label">Item Name</h3>
              <input
                type="text"
                className="inv__details-input"
                placeholder="Television"
              />
              <h3 className="inv__details-label">Description</h3>
              <input
                type="text"
                name="name"
                id="name"
                className="inv__details-input-desc"
                placeholder='This 50", 4K LED TV provides a crystal-clear picture and vivid colors.'
              />
              <h3 className="inv__details-label">Category</h3>
              <input
                type="text"
                name="name"
                id="name"
                className="inv__details-input"
                placeholder="Electronics"
              />
              <img
                className="inv__details-input-logo-1"
                src={ArrowDown}
                alt="Arrow down"
              />
            </div>
            <div className="inv__avail">
              <h2 className="inv__sub-title">Item Availability</h2>
              <h3 className="inv__details-label">Status</h3>
              <div className="inv__avail-wrapper">
                <div className="inv__avail-cont">
                  <div class="inv__avail-shape"></div>
                  <p className="inv__avail-text">In stock</p>
                </div>
                <div className="inv__avail-conta">
                  <p className="inv__avail-text2">Out of stock</p>
                  <div class="inv__avail-shape-out">
                    <div class="inv__avail-dot"></div>
                  </div>
                </div>
              </div>

              <h3 className="inv__details-label">Warehouse</h3>
              <input
                type="text"
                name="name"
                id="name"
                className="inv__details-input"
                placeholder="Manhattan"
              />
              <img
                className="inv__avail-input-logo-2"
                src={ArrowDown}
                alt="Arrow down"
              />
            </div>
          </div>
          <div className="inv__avail-button">
            <button className="inv__button-cancel">Cancel</button>
            <button className="inv__button-save">Save</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditInventoryItem;
