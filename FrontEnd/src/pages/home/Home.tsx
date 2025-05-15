import styles from "./Home.module.scss";
import IntroSection from "../../componets/intro/IntroSection";
import ProdutosCarousel from "../../componets/carroselProduct/ProdutosCarousel";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <section className={`${styles.products} ${styles.card}`}>
        <IntroSection />
      </section>

      <main className={styles.main}>
        <section className={`${styles.acessorios} ${styles.card}`}>
          <h2 className={styles.Title}>{t("products")}</h2>
          <hr className={styles.line} />
          <ProdutosCarousel />
        </section>
      </main>
    </div>
  );
};

export default Home;
