import logo from "../../assets/logos/InStock-Logo_2x.png";
import "./Header.scss";
import { NavLink, Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="instock-logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__list">
          <NavLink
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
            to="/warehouses"
          >
            Warehouses
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "header__link header__link--active" : "header__link"
            }
            to="/inventory"
          >
            Inventory
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
