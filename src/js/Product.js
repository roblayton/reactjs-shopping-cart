var React = require('react');
var EventEmitter = require("events").EventEmitter;

var eventer = new EventEmitter();

var Product = React.createClass({
  addToCart: function() {
    eventer.emit("CartItemAdded", null, this.props.key); 
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
