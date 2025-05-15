import React from 'react';
import styles from './IntroSection.module.scss';
import EtekLogo from '../../assets/logo/EtekGreenLogo.png';

const IntroSection: React.FC = () => {
  return (
    <section className={`${styles.intro} ${styles.card}`}>
      <div className={styles.textContent}>
        <p>
          Não é só tecnologia.<br />
          É atitude em forma de produto.<br />
          (E-TEK = personalidade + potência).
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Ver Produtos</button>
      </div>
      <div className={styles.logoWrapper}>
        <img src={EtekLogo} alt="Logo E-TEK" className={styles.logoGlow} />
      </div>
    </section>
  );
};

export default IntroSection;
