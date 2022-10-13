import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from './services/api';
import Categories from './components/Categories';
import ProductCard from './components/ProductCard';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import './styles/App.css';
// import HeaderMainLogo from './styles/images/header-main-logo.png';

class App extends React.Component {
  constructor() {
    super();

    this.clickHandler = this.clickHandler.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.state = {
      queryInput: '',
      products: [],
      selectedCategorie: '',
      cart: [],

    };
  }

  componentDidMount() {
    this.getCartItems();
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

  getCartItems() {
    const storage = localStorage.getItem('cart') || [];

    if (storage.length) {
      const cart = JSON.parse(storage);

      this.setState(({ cart }));
    }
  }

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
    const { queryInput, products, selectedCategorie, cart } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/shoppingCart" component={ ShoppingCart } />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              cart={ cart }
              addToCart={ this.addToCart }
            />) }
          />
          {/* <Route path="/product/:id" component={ ProductDetails } /> */}
          <div id="header-bar">
            <div className="search-bar">
              <input
                type="text"
                id="queryInput"
                value={ queryInput }
                onChange={ this.handleChange }
                data-testid="query-input"
                placeholder="Buscar por produtos"
              />
              <button
                id="search-button"
                type="button"
                onClick={ this.handleButtonClick }
                data-testid="query-button"
              >
                {/* <img src={ SearchLogo } alt="search" /> */}
              </button>
            </div>
            <img
              src="https://64.media.tumblr.com/15daa88d01c163793360dddd30c444af/e5ba6524597f8ab3-95/s400x600/11a25e7deb31564a8e558552eaec1752575a8e29.pnj"
              alt="Front-End Online Store"
            />
            <Link
              className="cart-link"
              data-testid="shopping-cart-button"
              to="/shoppingCart"
            >
              <img id="cart-logo" src="https://64.media.tumblr.com/e766ce96a68f3c9a5f48076bad89deb4/80cc679144b62544-8f/s75x75_c1/fa08f9850ec48e9584765be1ed7df1458be83672.pnj" alt="Quantidade de itens" />
              <p id="cart-counter" data-testid="shopping-cart-size">{cart.length}</p>
            </Link>
          </div>
        </Switch>
        <main id="main-content">
            <Categories
              selectHandle={ this.clickHandler }
              selectedCategorie={ selectedCategorie }
            />
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
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
