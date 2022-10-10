import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { image, name, price, id } = this.props;
    return (
      <Link data-testid="product-detail-link" to={ `/product/${id}` }>
        <div data-testid="product">
          <img src={ image } alt={ `${name}` } />
          <p>{name}</p>
          <p>{price}</p>
        </div>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductCard;
