import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();

    this.state = {
      cart: [],
      quantities: {},
    };
  }

  componentDidMount() {
    this.getFromStorage();
  }

  componentDidUpdate() {
    const { cart } = this.state;

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  setQuantities = () => {
    const { cart } = this.state;

    cart.map(({ id }) => this.setState((prevState) => ({
      quantities: {
        ...prevState.quantities,
        [id]: 1,
      },
    })));
  };

  getFromStorage = () => {
    const storage = localStorage.getItem('cart') || [];

    if (storage.length) {
      const cart = JSON.parse(storage);

      this.setState(({ cart }), () => this.setQuantities());
    }
  };

  removeItem = (id) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((item) => item.id !== id),
    }));
  };

  handleChange = (operation, id) => {
    const { quantities } = this.state;

    switch (operation) {
    case '+':
      this.setState((prevState) => ({
        quantities: {
          ...prevState.quantities,
          [id]: prevState.quantities[id] + 1,
        },
      }));
      break;

    case '-':
      if (quantities[id] === 1) {
        break;
      }

      this.setState((prevState) => ({
        quantities: {
          ...prevState.quantities,
          [id]: prevState.quantities[id] - 1,
        },
      }));
      break;

    case 'Remover':
      this.removeItem(id);
      break;

    default:
      return null;
    }
  };

  render() {
    const { cart, quantities } = this.state;

    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cart.map((item, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <p data-testid="shopping-cart-product-quantity">{quantities[item.id]}</p>
              <button
                type="button"
                onClick={ () => this.handleChange('+', item.id) }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                type="button"
                onClick={ () => this.handleChange('-', item.id) }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <button
                type="button"
                onClick={ () => this.handleChange('Remover', item.id) }
                data-testid="remove-product"
              >
                Remover
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default ShoppingCart;
