var React = require('react');
var Product = require('./Product');

var ProductList = React.createClass({
  render: function() {
    var products = this.props.products.map(function(p) {
      return <Product key={p.productId} productId={p.productId} name={p.productName} price={p.price} />  
    });
    return (
      <div id="products">
        <h2>Products</h2>
        <ul>
          {products}
        </ul>
      </div>
    )
  }
});

module.exports = ProductList;
