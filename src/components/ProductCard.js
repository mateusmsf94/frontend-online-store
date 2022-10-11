import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { product, product: { id, thumbnail, title, price }, addToCart } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          <img src={ thumbnail } alt={ `${title}` } />
          <p>{title}</p>
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
  product: PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
