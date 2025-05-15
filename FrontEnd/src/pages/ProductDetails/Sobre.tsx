import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Sobre.module.scss';
import imgAcc from '../../assets/ImgAcc/img';
import img from '../../assets/ImgProducts/img';

interface Acessorio {
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

interface ProdutoBase {
  nome: string;
  preco: string | number;
  descricao: string[];
  imagem: string;
}

interface ProdutoCarrinho {
  produtoBase: ProdutoBase;
  acessorios: AcessorioCarrinho[];
  total: number;
}

interface AcessorioCarrinho extends Acessorio {
  quantidade: number;
}

const listaAcessorios: Acessorio[] = [
  { nome: "Controle sem fio DualSense", descricao: "Controle com feedback tátil, gatilhos adaptáveis e microfone embutido.", preco: 449, imagem: imgAcc.Controle },
  { nome: "Headset gamer (P2/USB)", descricao: "Qualidade de som imersiva com entrada P2 ou conexão USB.", preco: 299, imagem: imgAcc.Headseat },
  { nome: "Base de carregamento", descricao: "Carrega até dois controles simultaneamente.", preco: 229, imagem: imgAcc.Base },
  { nome: "Suporte vertical", descricao: "Mantém o PS5 estável na vertical.", preco: 99, imagem: img.PS5 },
  { nome: "SSD NVMe", descricao: "Expansão interna com velocidade ultrarrápida.", preco: 899, imagem: imgAcc.SSD },
  { nome: "HD externo", descricao: "Armazenamento adicional para jogos.", preco: 499, imagem: imgAcc.HD },
  { nome: "Volante e pedal", descricao: "Ideal para jogos de corrida.", preco: 1499, imagem: imgAcc.Volante },
  { nome: "Capa protetora", descricao: "Protege contra poeira e arranhões.", preco: 79, imagem: imgAcc.Capa }
];

const Sobre: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const produto: ProdutoBase = location.state;

  const [acessoriosAdicionados, setAcessoriosAdicionados] = useState<AcessorioCarrinho[]>([]);
  const [acessoriosAPI, setAcessoriosAPI] = useState<Acessorio[]>([]);

  useEffect(() => {
    const fetchAcessoriosDoProduto = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/accessories/');
        const data = await response.json();

        console.log("🔍 Acessórios da API:", data);
        console.log("🟢 Produto atual:", produto.nome);

        const relacionados = data
          .filter((item: any) =>
            item.devices?.some((device: any) =>
              device.name.trim().toLowerCase() === produto.nome.trim().toLowerCase()
            )
          )
          .map((item: any) => ({
            nome: item.name,
            descricao: item.description || 'Acessório recomendado para o produto.',
            preco: parseFloat(item.price) || 0,
            imagem: item.image || 'https://via.placeholder.com/80'
          }));

        console.log("✅ Acessórios compatíveis:", relacionados);
        setAcessoriosAPI(relacionados);
      } catch (error) {
        console.error('❌ Erro ao buscar acessórios da API:', error);
      }
    };

    if (produto?.nome) {
      fetchAcessoriosDoProduto();
    }
  }, [produto]);

  const precoBase = typeof produto.preco === 'string'
    ? Number(produto.preco.replace(/[^\d,]/g, '').replace(',', '.'))
    : produto.preco || 0;

  const totalAcessorios = acessoriosAdicionados.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const totalGeral = precoBase + totalAcessorios;

  const adicionarAcessorio = (acessorio: Acessorio) => {
    const index = acessoriosAdicionados.findIndex(item => item.nome === acessorio.nome);
    const atualizados = [...acessoriosAdicionados];

    if (index >= 0) {
      atualizados[index].quantidade += 1;
    } else {
      atualizados.push({ ...acessorio, quantidade: 1 });
    }

    setAcessoriosAdicionados(atualizados);
  };

  const removerAcessorio = (acessorio: Acessorio) => {
    const index = acessoriosAdicionados.findIndex(item => item.nome === acessorio.nome);
    const atualizados = [...acessoriosAdicionados];

    if (index >= 0) {
      if (atualizados[index].quantidade === 1) {
        atualizados.splice(index, 1);
      } else {
        atualizados[index].quantidade -= 1;
      }
    }

    setAcessoriosAdicionados(atualizados);
  };

  const irParaCarrinho = () => {
    const novoProduto: ProdutoCarrinho = {
      produtoBase: produto,
      acessorios: acessoriosAdicionados,
      total: totalGeral
    };

    const carrinhoSalvo = localStorage.getItem('carrinhoCompleto');
    const carrinhoAtual: ProdutoCarrinho[] = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

    carrinhoAtual.push(novoProduto);
    localStorage.setItem('carrinhoCompleto', JSON.stringify(carrinhoAtual));
    navigate('/cart');
  };

  const renderCard = (item: Acessorio, index: number) => (
    <div key={index} className={styles.card}>
      <img src={item.imagem} alt={item.nome} />
      <h3>{item.nome}</h3>
      <p>{item.descricao}</p>
      <span>R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      <button onClick={() => adicionarAcessorio(item)}>Adicionar</button>
    </div>
  );

  return (
    <main className={styles.container}>
      <section className={styles.linhaPrincipal}>
        <div className={styles.produto}>
          <img src={produto.imagem} alt={produto.nome} className={styles.imagemProduto} />
          <div className={styles.descricaoBloco}>
            <h1 className={styles.TitleNameProduct}>{produto.nome}</h1>

            <div className={styles.boxDescricao}>
              <h2>Descrição do produto</h2>
              <div className={styles.textoDescricao}>
                {produto.descricao.map((linha, index) => (
                  <p key={index}>{linha}</p>
                ))}
              </div>
            </div>

            <h1>Valor Do Produto Base:</h1>
            <p className={styles.preco}>
              {typeof produto.preco === 'string' ? produto.preco : `R$ ${produto.preco.toFixed(2)}`}
            </p>
          </div>
        </div>

        <div className={styles.acessorios}>
          <h2>Acessórios compatíveis</h2>

          {acessoriosAPI.length > 0 && (
            <>
              <h3 className={styles.subtitulo}>Recomendados para este produto</h3>
              <div className={styles.grid}>
                {acessoriosAPI.map(renderCard)}
              </div>
            </>
          )}

          <h3 className={styles.subtitulo}>Outros acessórios</h3>
          <div className={styles.grid}>
            {listaAcessorios.map(renderCard)}
          </div>

          {acessoriosAdicionados.length > 0 && (
            <div className={styles.adicionados}>
              <h3>Acessórios adicionados:</h3>
              <ul>
                {acessoriosAdicionados.map((item, index) => (
                  <li key={index}>
                    <span>{item.nome}</span>
                    <span className={styles.precoAcessorio}>
                      {item.quantidade}x R$ {item.preco.toLocaleString('pt-BR')} = R$ {(item.quantidade * item.preco).toLocaleString('pt-BR')}
                    </span>
                    <div className={styles.botoes}>
                      <button onClick={() => removerAcessorio(item)}>-</button>
                      <button onClick={() => adicionarAcessorio(item)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.total}>
            <h3>Total da compra:</h3>
            <p>R$ {totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <button className={styles.botaoComprar} onClick={irParaCarrinho}>
              Comprar agora
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sobre;
