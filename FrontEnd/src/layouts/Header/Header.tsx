import styles from "./Header.module.scss";
import icons from "../../assets/icons/icons";
import EtekWhiteLogo from "../../assets/logo/EtekWhiteLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={EtekWhiteLogo}
          alt="Etek Logo"
          className={styles.logoImage}
        />
      </div>

      <nav className={styles.nav} aria-label="Main menu">
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navItem}>
              Products
            </Link>
          </li>
        </ul>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            aria-label="Search"
          />
          <img src={icons.IconSearch} alt="Search Icon" className={styles.icon} />
        </div>

        <div className={styles.cartWrapper}>
          <Link to="/cart" className={styles.cartLink}>
            <img src={icons.IconCart} alt="Cart" className={styles.cartIcon} />
          </Link>
        </div>

        <div className={styles.userWrapper}>
          <h1 className={styles.userName}>Vitor Martins Melo</h1>
          <img src={icons.UserIcon} alt="User" className={styles.userIcon} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
