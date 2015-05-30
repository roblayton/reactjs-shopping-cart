var React = require('react');
var ProductList = require('./ProductList');

var products = [
  {id: 0, productName: "a", tag: ["books"], price: 1.00},
  {id: 1, productName: "b", tag: ["books"], price: 1.00},
  {id: 2, productName: "c", tag: ["movies"], price: 1.00},
  {id: 3, productName: "d", tag: ["music"], price: 1.00},
  {id: 4, productName: "e", tag: ["music"], price: 1.00}
];

React.render(<ProductList products={products} />, document.getElementById('app'));
