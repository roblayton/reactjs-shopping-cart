var React = require('react');
var Product = require('./Product');

var ProductList = React.createClass({
  render: function() {
    var products = this.props.products.map(function(p) {
      return <Product key={p.productId} productId={p.productId} name={p.productName} tag={p.tag} price={p.price} />  
    });
    return (
      <ul>
        {products}
      </ul>
    )
  }
});

module.exports = ProductList;
