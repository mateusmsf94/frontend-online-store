import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.fetchCategories = this.fetchCategories.bind(this);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const objects = await getCategories();
    this.setState({ categories: objects });
  }

  render() {
    const { categories } = this.state;
    const { selectHandle } = this.props;
    return (
      <div id="categories-aside">
        { categories
          .map((categorie) => (
            <button
              data-testid="category"
              type="submit"
              key={ categorie.id }
              onClick={ selectHandle }
              value={ categorie.id }
            >
              { categorie.name }
            </button>))}
      </div>
    );
  }
}

Categories.propTypes = {
  selectHandle: PropTypes.func.isRequired,
};

export default Categories;
