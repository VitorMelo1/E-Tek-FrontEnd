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
  const [cart, setCart] = useState<ProdutoCarrinho[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('carrinhoCompleto');
    if (savedData) {
      setCart(JSON.parse(savedData));
    }
  }, []);

  const saveCart = (newCart: ProdutoCarrinho[]) => {
    setCart(newCart);
    localStorage.setItem('carrinhoCompleto', JSON.stringify(newCart));
  };

  const removeProduct = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    saveCart(newCart);
  };

  const removeAccessory = (productIndex: number, accessoryIndex: number) => {
    const newCart = [...cart];
    const accessories = [...newCart[productIndex].acessorios];
    accessories.splice(accessoryIndex, 1);

    const basePrice = typeof newCart[productIndex].produtoBase.preco === 'string'
      ? Number(newCart[productIndex].produtoBase.preco.replace(/[^\d,]/g, '').replace(',', '.'))
      : newCart[productIndex].produtoBase.preco;

    const accessoriesTotal = accessories.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    newCart[productIndex] = {
      ...newCart[productIndex],
      acessorios: accessories,
      total: basePrice + accessoriesTotal
    };

    saveCart(newCart);
  };

  const checkout = () => {
    alert('Purchase completed successfully!');
    localStorage.removeItem('carrinhoCompleto');
    setCart([]);
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.total, 0);

  if (cart.length === 0) {
    return (
      <main className={styles.container}>
        <div className={styles.emptyCart}>
          <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty cart" />
          <h2>Your cart is empty</h2>
          <p>Add products to see your order here.</p>
          <button onClick={goBack}>Back to store</button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.TitleSobre_Produtos}>Order Summary</h1>

      {cart.map((product, pIndex) => (
        <section className={styles.section} key={pIndex}>
          <div className={styles.topoProduto}>
            <h2>{product.produtoBase.nome}</h2>
            <button className={styles.btnRemoverProduto} onClick={() => removeProduct(pIndex)}>Remove Product</button>
          </div>

          <div className={styles.card}>
            <img src={product.produtoBase.imagem} alt={product.produtoBase.nome} />
            <div>
              <p><strong>Base price:</strong> {typeof product.produtoBase.preco === 'string'
                ? product.produtoBase.preco
                : `$ ${product.produtoBase.preco.toFixed(2)}`}</p>
              <p><strong>Total with accessories:</strong> $ {product.total.toLocaleString('en-US')}</p>
            </div>
          </div>

          {product.acessorios.length > 0 && (
            <div className={styles.acessorios}>
              <h3>Accessories:</h3>
              <ul className={styles.list}>
                {product.acessorios.map((item, aIndex) => (
                  <li key={aIndex} className={styles.cardAcessorio}>
                    <img src={item.imagem} alt={item.nome} />
                    <div>
                      <h4>{item.nome}</h4>
                      <p>{item.quantidade}x $ {item.preco.toLocaleString('en-US')}</p>
                      <p><strong>Total:</strong> $ {(item.quantidade * item.preco).toLocaleString('en-US')}</p>
                    </div>
                    <button className={styles.btnRemoverAcessorio} onClick={() => removeAccessory(pIndex, aIndex)}>
                      Remove Accessory
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}

      <section className={styles.total}>
        <h2>Total</h2>
        <p>$ {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      </section>

      <div className={styles.actions}>
        <button className={styles.secondary} onClick={goBack}>Back</button>
        <button className={styles.primary} onClick={checkout}>Checkout</button>
      </div>
    </main>
  );
};

export default Cart;
