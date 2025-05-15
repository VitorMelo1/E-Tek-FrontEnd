
import styles from "./Home.module.scss";
import IntroSection from "../../componets/intro/IntroSection";
import ProdutosCarousel from "../../componets/carroselProduct/ProdutosCarousel";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={`${styles.products} ${styles.card}`}>
        <IntroSection />
      </section>

      <main className={styles.main}>
      <section className={`${styles.acessorios} ${styles.card}`}>
          <h2 className={styles.Title}>Produtos</h2>
          <hr className={styles.line} />
          <ProdutosCarousel />
        </section>

        {/* <section className={`${styles.acessorios} ${styles.card}`}>
        <h2 className={styles.Title}>Acessorios</h2>
        <hr className={styles.line} />
          
        </section> */}
      </main>
    </div>
  );
};

export default Home;
