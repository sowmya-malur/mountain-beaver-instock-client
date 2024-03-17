import logo from "../../assets/logos/InStock-Logo_2x.png";
import "./Header.scss";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="instock-logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__list">
          <Link className="header__link" to="/warehouses">
            Warehouses
          </Link>
          <Link className="header__link" to="/inventory">
            Inventory
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
