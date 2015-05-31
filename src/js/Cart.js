var React = require('react');
var MBus = require('./MessageBus');
var http = require('http');

var Cart = React.createClass({
  getInitialState: function() {
    return {
      cartItems: []
    }
  },
  componentDidMount: function() {
    MBus.on('CartItemAdded', function(e, productId) {
      this.updateCart(productId);
    }.bind(this));
  },
  updateCart: function(productId) {
    console.log(productId);
    // TODO: Fetch from DB
    var req = http.request({
      host: 'http://localhost/reactjs-shopping-cart',
      path: '/src/data/products.json',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, function(res) {
      res.on('data', function (data) {
        console.log(data);
      });
    });
  },
  render: function() {
    return (
      <div></div>
    )
  }
});

module.exports = Cart;
