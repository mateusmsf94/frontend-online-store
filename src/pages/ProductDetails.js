import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      product: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchProduct(id).catch((e) => { console.error(e); });
  }

  fetchProduct = async (id) => {
    const response = await getProductById(id);
    this.setState({
      product: response,
    });
  };

  render() {
    const { product } = this.state;
    // getProductById(id).then((data) => console.log(data[0].body.title));

    // console.log(product);

    return (
      <div>

        <p data-testid="product-detail-name">{product.title}</p>
        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">{product.price}</p>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetails;
