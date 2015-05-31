var React = require('react'),
    ProductList = require('./ProductList'),
    Cart = require('./Cart'),
    request = require('request');

request({
  uri: 'http://192.168.99.112:5000/products',
  method: 'GET',
  withCredentials: false,
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10,
  headers: {
    'Content-Type': 'application/json'
  }
}, function(err, res, body) {
  var products = JSON.parse(body);

  React.render(
    <div>
      <ProductList products={products} />
      <Cart />
    </div>,
  document.getElementById('app'));

});

