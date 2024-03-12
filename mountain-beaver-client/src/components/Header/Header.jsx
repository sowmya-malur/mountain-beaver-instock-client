import logo from "../../assets/logos/InStock-Logo_2x.png";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="instock-logo" />
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__link">Warehouses</li>
          <li className="header__link">Inventory</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
