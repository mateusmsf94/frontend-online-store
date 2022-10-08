import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from './services/api';
import Categories from './components/Categories';
import ProductCard from './components/ProductCard';
import ShoppingCart from './pages/ShoppingCart';

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
        <BrowserRouter>
          <Route path="/shoppingCart" component={ ShoppingCart } />
          <Switch>
            <Link
              data-testid="shopping-cart-button"
              to="/shoppingCart"
            >
              Carrinho de compras
            </Link>
          </Switch>
        </BrowserRouter>
        <Categories />
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
