import React from 'react'
import styles from './Cards.module.scss'

export interface CardProps {
  id?: number;
  tag?: string;
  imagem: string;
  nome: string;
  descricao: string[];
  preco: string;
  onBuy?: () => void;
}


const Card: React.FC<CardProps> = ({
  tag,
  imagem,
  nome,
  descricao,
  preco,
  onBuy
}) => {
  return (
    <div className={styles.card}>
      {tag && <span className={styles.tag}>{tag}</span>}

      <div className={styles.imageWrapper}>
        <img src={imagem} alt={nome} className={styles.imagem} />
      </div>

      <div className={styles.info}>
        <h3 className={`${styles.nome} ${styles.text}`}>{nome}</h3>

        <ul className={`${styles.descricao} ${styles.text}`}>
          {descricao.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <p className={`${styles.preco} ${styles.text}`}>{preco}</p>

        {onBuy && (
          <button
            className={styles.botao}
            onClick={onBuy}
            type="button"
          >
            Compre agora
          </button>
        )}
      </div>
    </div>
  )
}

export default Card
