import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     cart: [],
  //   };
  // }

  componentDidMount() {
    this.addToState();
  }

  addToState = () => {
    const getLocalStorage = localStorage.getItem('cart');
    const data = JSON.parse(getLocalStorage);
    this.setState({
      cart: data,
    });
  };

  render() {
    const { cart } = this.props;
    return (
      <div>
        {!cart
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cart.map((item) => (
            <div key={ item.id }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <p data-testid="shopping-cart-product-quantity" />
            </div>
          ))}

      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes..isRequired,
};

export default ShoppingCart;
