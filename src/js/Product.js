var React = require('react');
var MBus = require('./MessageBus');

var Product = React.createClass({
  addToCart: function() {
    MBus.emit('CartItemAdded', this.props.productId); 
  },
  render: function() {
    return (
      <div className="product">
        <div>Name: {this.props.name}</div>
        <div>Price: {this.props.price}</div>
        <button onClick={this.addToCart}>Add to cart</button>
      </div>
    )
  } 
});

module.exports = Product;
