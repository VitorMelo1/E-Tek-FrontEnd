import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';

interface ProdutoBase {
  nome: string;
  preco: string | number;
  imagem: string;
}

interface Acessorio {
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

interface ProdutoCarrinho {
  produtoBase: ProdutoBase;
  acessorios: Acessorio[];
  total: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('carrinhoCompleto');
    if (dadosSalvos) {
      setCarrinho(JSON.parse(dadosSalvos));
    }
  }, []);

  const salvarCarrinho = (novoCarrinho: ProdutoCarrinho[]) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinhoCompleto', JSON.stringify(novoCarrinho));
  };

  const removerProduto = (index: number) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    salvarCarrinho(novoCarrinho);
  };

  const removerAcessorio = (produtoIndex: number, acessorioIndex: number) => {
    const novoCarrinho = [...carrinho];
    const acessorios = [...novoCarrinho[produtoIndex].acessorios];
    acessorios.splice(acessorioIndex, 1);

    const precoBase = typeof novoCarrinho[produtoIndex].produtoBase.preco === 'string'
      ? Number(novoCarrinho[produtoIndex].produtoBase.preco.replace(/[^\d,]/g, '').replace(',', '.'))
      : novoCarrinho[produtoIndex].produtoBase.preco;

    const totalAcessorios = acessorios.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    novoCarrinho[produtoIndex] = {
      ...novoCarrinho[produtoIndex],
      acessorios,
      total: precoBase + totalAcessorios
    };

    salvarCarrinho(novoCarrinho);
  };

  const finalizarCompra = () => {
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('carrinhoCompleto');
    setCarrinho([]);
    navigate('/');
  };

  const voltar = () => {
    navigate(-1);
  };

  const totalGeral = carrinho.reduce((acc, item) => acc + item.total, 0);

  if (carrinho.length === 0) {
    return (
      <main className={styles.container}>
        <div className={styles.emptyCart}>
          <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Carrinho vazio" />
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos para visualizar seu pedido aqui.</p>
          <button onClick={voltar}>Voltar para loja</button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.TitleSobre_Produtos}>Resumo do Pedido</h1>

      {carrinho.map((produto, pIndex) => (
        <section className={styles.section} key={pIndex}>
          <div className={styles.topoProduto}>
            <h2>{produto.produtoBase.nome}</h2>
            <button className={styles.btnRemoverProduto} onClick={() => removerProduto(pIndex)}>Remover Produto</button>
          </div>

          <div className={styles.card}>
            <img src={produto.produtoBase.imagem} alt={produto.produtoBase.nome} />
            <div>
              <p><strong>Preço base:</strong> {typeof produto.produtoBase.preco === 'string'
                ? produto.produtoBase.preco
                : `R$ ${produto.produtoBase.preco.toFixed(2)}`}</p>
              <p><strong>Total com acessórios:</strong> R$ {produto.total.toLocaleString('pt-BR')}</p>
            </div>
          </div>

          {produto.acessorios.length > 0 && (
            <div className={styles.acessorios}>
              <h3 >Acessórios:</h3>
              <ul className={styles.list}>
                {produto.acessorios.map((item, aIndex) => (
                  <li key={aIndex} className={styles.cardAcessorio}>
                    <img src={item.imagem} alt={item.nome} />
                    <div>
                      <h4>{item.nome}</h4>
                      <p>{item.quantidade}x R$ {item.preco.toLocaleString('pt-BR')}</p>
                      <p><strong>Total:</strong> R$ {(item.quantidade * item.preco).toLocaleString('pt-BR')}</p>
                    </div>
                    <button className={styles.btnRemoverAcessorio} onClick={() => removerAcessorio(pIndex, aIndex)}>
                      Remover Acessório
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}

      <section className={styles.total}>
        <h2>Total Geral</h2>
        <p>R$ {totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      </section>

      <div className={styles.actions}>
        <button className={styles.secondary} onClick={voltar}>Voltar</button>
        <button className={styles.primary} onClick={finalizarCompra}>Finalizar Compra</button>
      </div>
    </main>
  );
};

export default Cart;
