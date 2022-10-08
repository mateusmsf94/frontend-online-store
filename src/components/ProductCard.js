import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { image, name, price } = this.props;
    return (
      <div data-testid="product">
        <img src={ image } alt={ `${name}` } />
        <p>{name}</p>
        <p>{price}</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductCard;
