import React from 'react';
import Categories from './components/Categories';

class App extends React.Component {
  render() {
    return (
      <>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
      </>
    );
  }
}

export default App;
