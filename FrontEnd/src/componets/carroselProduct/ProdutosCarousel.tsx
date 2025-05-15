import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProdutosCarousel.module.scss';
import Card, { CardProps } from '../cards/cards';

const ProdutosCarousel: React.FC = () => {
  const [produtos, setProdutos] = useState<CardProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const itemsPerPage = 2;
  const navigate = useNavigate();
  const slideWidth = 550 + 20;

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/devices/`);


        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        const produtosComOnBuy: CardProps[] = data.map((produto: any) => {
          const descricaoFormatada =
            typeof produto.description === 'string'
              ? produto.description.replace(/\\n/g, '\n').split('\n')
              : Array.isArray(produto.description)
                ? produto.description
                : [String(produto.description)];

          const precoFormatado = Number(produto.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          const produtoCard: CardProps = {
            tag: produto.tag || '',
            imagem: produto.image,
            nome: produto.name,
            descricao: descricaoFormatada,
            preco: precoFormatado,
            id: produto.id,
            onBuy: () =>
              navigate('/sobre', {
                state: {
                  imagem: produto.image,
                  nome: produto.name,
                  descricao: descricaoFormatada,
                  preco: precoFormatado,
                  id: produto.id
                }
              })
          };


          return produtoCard;
        });

        setProdutos(produtosComOnBuy);
      } catch (error: any) {
        setErro(`Erro ao carregar produtos: ${error.message || 'Erro desconhecido'}`);
        console.error('[Erro ao buscar produtos]:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [navigate]);

  const totalPages = Math.ceil(produtos.length / itemsPerPage);
  const prevPage = () => setPage(p => Math.max(p - 1, 0));
  const nextPage = () => setPage(p => Math.min(p + 1, totalPages - 1));

  if (loading) return <p className={styles.loading}>Carregando produtos...</p>;
  if (erro) return <p className={styles.erro}>{erro}</p>;

  return (
    <div className={styles.carouselWrapper}>
      <button className={styles.arrowLeft} onClick={prevPage} disabled={page === 0}>◀</button>

      <div className={styles.carouselViewport}>
        <div
          className={styles.slider}
          style={{
            width: `${produtos.length * slideWidth}px`,
            transform: `translateX(-${page * itemsPerPage * slideWidth}px)`,
            transition: 'transform 0.3s ease'
          }}
        >
          {produtos.map((p) => (
            <Card key={p.id} {...p} />
          ))}
        </div>
      </div>

      <button className={styles.arrowRight} onClick={nextPage} disabled={page >= totalPages - 1}>▶</button>
    </div>
  );
};

export default ProdutosCarousel;
