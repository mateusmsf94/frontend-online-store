import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { image, name, price, id, product, addToCart } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          <img src={ image } alt={ `${name}` } />
          <p>{name}</p>
          <p>{price}</p>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addToCart(product) }
        >
          Adcionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductCard;
