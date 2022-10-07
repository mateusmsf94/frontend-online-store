import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cart.map((item, index) => <p key={ index }>{item}</p>)}

      </div>
    );
  }
}

export default ShoppingCart;
