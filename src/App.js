import React from 'react';
import ProductCard from './components/ProductCard';
import { getProductsFromCategoryAndQuery } from './services/api';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      queryInput: '',
      products: [],
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  };

  handleButtonClick = async () => {
    const { queryInput } = this.state;
    const { results } = await getProductsFromCategoryAndQuery('MLB5672', queryInput);

    this.setState({
      products: results,
    });
  };

  render() {
    const { queryInput, products } = this.state;

    return (
      <>
        <input
          type="text"
          id="queryInput"
          value={ queryInput }
          onChange={ this.handleChange }
          data-testid="query-input"
        />
        <button
          type="button"
          onClick={ this.handleButtonClick }
          data-testid="query-button"
        >
          Pesquisar
        </button>
        {products.length !== 0 ? (
          products.map((product) => (
            <ProductCard
              key={ product.id }
              image={ product.thumbnail }
              name={ product.title }
              price={ product.price.toString() }
            />
          ))
        ) : (
          <p>Nenhum produto foi encontrado</p>
        )}
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </>
    );
  }
}

export default App;
