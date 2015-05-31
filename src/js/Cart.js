var React = require('react');
var MBus = require('./MessageBus');
var CartItem = require('./CartItem');
var request = require('request');
var ShoppingUtil = require('./ShoppingUtil');

var Cart = React.createClass({
  getInitialState: function() {
    return {
      cartItems: [],
      total: 0
    }
  },
  componentDidMount: function() {
    MBus.on('CartItemAdded', function(e, productId) {
      this.updateCart(productId);
    }.bind(this));
  },
  updateCart: function(productId) {
    var cartItems = this.state.cartItems;
    request({
      uri: 'http://192.168.99.114:5000/product?id=' + productId,
      method: 'GET',
      withCredentials: false,
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10,
      headers: {
        'Content-Type': 'application/json'
      }
    }, function(err, res, body) {
      cartItems = cartItems.concat(JSON.parse(body));
      var total = ShoppingUtil.calcCartTotalPrice(cartItems);
      this.setState({ cartItems: cartItems, total: "$" + total.toFixed(2) });
    }.bind(this));
  },
  purchase: function() {
    this.setState({ cartItems: [], total: "Thank you for your purchase!" });
  },
  render: function() {
    var cartItems = this.state.cartItems.map(function(c) {
      return <CartItem key={c.productId + (Math.random() * 99999)} productId={c.productId} name={c.productName} price={c.price} />
    });
    return (
      <div id="cart">
        <h2>Your Cart</h2>
        <div id="total">Total: <b>{this.state.total}</b></div>
        <div>{cartItems}</div>
        <button onClick={this.purchase}>Purchase</button>
      </div>
    )
  }
});

module.exports = Cart;
