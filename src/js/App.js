var React = require('react');
var ProductList = require('./ProductList');
var Cart = require('./Cart');
var products = require('../data/products.json');

React.render(
  <div>
    <ProductList products={products} />
    <Cart />
  </div>,
document.getElementById('app'));
