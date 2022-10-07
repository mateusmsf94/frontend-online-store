import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import Categories from './components/Categories';

class App extends React.Component {
  render() {
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
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
      </>
    );
  }
}

export default App;
