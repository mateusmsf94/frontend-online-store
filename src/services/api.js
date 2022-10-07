export async function getCategories() {
  const url = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const json = await url.json();
  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId /* query */) {
  const url = await fetch(`https://api.mercadolibre.com/categories/${categoryId}`);
  const json = await url.json();
  return json;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
