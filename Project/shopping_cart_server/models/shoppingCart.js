const { use } = require('../routes/loginRouter');

let db = [];
let counter = 0;
class ShoppingCart {
    id;
    username;
    productName;
    productPrice;
    total;
    productQuantity;

    constructor(id, username, productName, productPrice, total, productQuantity) {
        this.id = id;
        this.username = username;
        this.productName = productName;
        this.productPrice = productPrice;
        this.total = total;
        this.productQuantity = productQuantity;
    }

    save() {
        this.id = ++counter;
        db.push(this);
        return this;
    }

    static getAll() {
        return db;
    }
       

    static delete(id) {
        const index = db.findIndex((s) => s.id == id);
        const deletedItem = db[index];
        db.splice(index, 1);
        return deletedItem;
    }

    edit() {
        const index = db.findIndex((s) => s.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    static placeOrder(username) {
        let index = db.findIndex((s) => s.username == username);
        while (index >= 0) {
            db.splice(index, 1);
            index = db.findIndex((s) => s.username == username);
        }
        return index;
    }

    static getShoppingCartByUsername(username) {
        return db.filter((s) => s.username === username);
    }

    static getShoppingCartByUsernameAndProductName(username, productName) {
        return db.find((s) => s.username === username && s.productName === productName);
    }
   
}


module.exports = ShoppingCart;