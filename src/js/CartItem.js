var React = require('react');

var CartItem = React.createClass({
  render: function() {
    return(
      <li className="cart-item">
        {this.props.name}, ${this.props.price}
      </li>
    )
  }
});

module.exports = CartItem;
