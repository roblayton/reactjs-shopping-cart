var React = require('react');

var Product = React.createClass({
  render: function() {
    console.log(this.props);
    return (
      <div className="product">
        <div>Name: {this.props.name}</div>
        <div>Price: {this.props.price}</div>
      </div>
    )
  } 
});

module.exports = Product;
