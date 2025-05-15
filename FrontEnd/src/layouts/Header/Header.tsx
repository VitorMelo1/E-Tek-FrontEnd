import styles from "./Header.module.scss";
import icons from "../../assets/icons/icons";
import EtekWhiteLogo from "../../assets/logo/EtekWhiteLogo.png";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img
                    src={EtekWhiteLogo
                    }
                    alt="Logo da Etek"
                    className={styles.logoImage}
                />
            </div>

            <nav className={styles.nav} aria-label="Menu principal">
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navItem}>Produtos</Link>
                    </li>
                </ul>


                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className={styles.searchInput}
                        aria-label="Campo de pesquisa"
                    />
                    <img src={icons.IconSearch} alt="" className={styles.icon} />
                </div>

                <div className={styles.cartWrapper}>
                    <Link to="/cart" className={styles.cartLink}>
                        <img src={icons.IconCart} alt="Carrinho" className={styles.cartIcon} />
                    </Link>
                </div>

                <div className={styles.userWrapper}>
                    <h1 className={styles.userName}>Vitor Martins Melo</h1>
                    <img src={icons.UserIcon} alt="Usuário" className={styles.userIcon} />

                </div>
            </nav>
        </header>
    );
};

export default Header;
