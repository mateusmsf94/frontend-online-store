export async function getCategories() {
  const url = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const json = await url.json();
  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const json = await url.json();
  return json;
}

export async function getProductById(id) {
  const url = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const json = await url.json();
  return json;
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
