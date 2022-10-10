import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  render() {
    const { cart } = this.props;
    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cart.map((item, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <p data-testid="shopping-cart-product-quantity">1</p>
            </div>
          ))}

      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
};

export default ShoppingCart;
