import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProdutosCarousel.module.scss';
import Card, { CardProps } from '../cards/cards';

const ProdutosCarousel: React.FC = () => {
  const [products, setProducts] = useState<CardProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const slideWidth = 400 + 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/devices/`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        const productsWithOnBuy: CardProps[] = data.map((product: any) => {
          const formattedDescription =
            typeof product.description === 'string'
              ? product.description.replace(/\\n/g, '\n').split('\n')
              : Array.isArray(product.description)
              ? product.description
              : [String(product.description)];

          const precoNumerico = Number(product.price);

          const productCard: CardProps = {
            tag: product.tag || '',
            imagem: product.image,
            nome: product.name,
            descricao: formattedDescription,
            preco: precoNumerico,
            id: product.id,
            onBuy: () =>
              navigate('/sobre', {
                state: {
                  imagem: product.image,
                  nome: product.name,
                  descricao: formattedDescription,
                  preco: precoNumerico,
                  id: product.id
                }
              })
          };

          return productCard;
        });

        setProducts(productsWithOnBuy);
      } catch (error: any) {
        setError(`Failed to load products: ${error.message || 'Unknown error'}`);
        console.error('[Product fetch error]:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const prevPage = () => setPage(p => Math.max(p - 1, 0));
  const nextPage = () => setPage(p => Math.min(p + 1, totalPages - 1));

  if (loading) return <p className={styles.loading}>Loading products...</p>;
  if (error) return <p className={styles.erro}>{error}</p>;

  return (
    <div className={styles.carouselWrapper}>
      <button className={styles.arrowLeft} onClick={prevPage} disabled={page === 0}>◀</button>

      <div className={styles.carouselViewport}>
        <div
          className={styles.slider}
          style={{
            width: `${products.length * slideWidth}px`,
            transform: `translateX(-${page * itemsPerPage * slideWidth}px)`,
            transition: 'transform 0.3s ease'
          }}
        >
          {products.map((p) => (
            <Card key={p.id} {...p} />
          ))}
        </div>
      </div>

      <button className={styles.arrowRight} onClick={nextPage} disabled={page >= totalPages - 1}>▶</button>
    </div>
  );
};

export default ProdutosCarousel;
