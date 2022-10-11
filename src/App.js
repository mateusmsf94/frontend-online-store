import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from './services/api';
import Categories from './components/Categories';
import ProductCard from './components/ProductCard';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();

    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      queryInput: '',
      products: [],
      selectedCategorie: '',
      cart: [],
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  };

  handleButtonClick = async () => {
    const { queryInput, selectedCategorie } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(
      selectedCategorie,
      queryInput,
    );

    this.setState({
      products: results,
    });
  };

  addToCart = (product) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }), () => {
      const { cart } = this.state;
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  };

  clickHandler(event) {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    this.setState(
      {
        selectedCategorie: value,
      },
      () => this.handleButtonClick(),
    );
  }

  render() {
    const { queryInput, products, selectedCategorie } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/shoppingCart" component={ ShoppingCart } />
          <Route
            exact
            path="/product/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
          {/* <Route path="/product/:id" component={ ProductDetails } /> */}
          <Link data-testid="shopping-cart-button" to="/shoppingCart">
            Carrinho de compras
          </Link>
        </Switch>

        <Categories
          selectHandle={ this.clickHandler }
          selectedCategorie={ selectedCategorie }
        />
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
              product={ product }
              addToCart={ this.addToCart }
            />
          ))
        ) : (
          <p>Nenhum produto foi encontrado</p>
        )}
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </BrowserRouter>
    );
  }
}

export default App;
