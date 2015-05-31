var ShoppingUtil = {
  calcCartTotalPrice: function(cart) {
    var total = 0;
    cart.map(function(c) {
      total += c.price; 
    });
    
    return total;
  }
};

module.exports = ShoppingUtil;
