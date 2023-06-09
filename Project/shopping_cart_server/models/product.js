class Product {
    id;
    name;
    price;
    image;
    stock;

    constructor(id, name, price, image, stock) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.price = price;
      this.stock = stock;
    }

    static getAll() {
        return db;
    }
  
    save() {
      db.push(this);
      return this;
    } 
  
    static getCurrentStock(productName) {
      const product = db.find((p) => p.name == productName);
      return product.stock;
    }
  
    static updateProductStock(shoppingCart) {
        let outOfStockProducts = '';
        for (let shoppingCartRow of shoppingCart)
        {
            let index = db.findIndex((p) => p.name == shoppingCartRow.productName);
            let product = db[index];
            if (product.stock - shoppingCartRow.productQuantity >= 0)
            {
                product.stock = product.stock - shoppingCartRow.productQuantity;
            }
            else
            {
                outOfStockProducts += shoppingCartRow.productName + ', ';
            }
        }

        return outOfStockProducts;
    }
  }
  
  let db = [];
  let nodejs = new Product(1, 'Node.js', 9.99, './images/nodejs.png', 8);
  let react = new Product(2, 'React', 19.99, './images/react.png', 5);
  let angular = new Product(3, 'Angular', 29.99, './images/angular.png', 13);
  db.push(nodejs);
  db.push(react);
  db.push(angular);
  
  module.exports = Product;