const { use } = require('../routes/loginRouter');

let db = [];
let counter = 0;
class ShoppingCart {
    id;    
    productName;
    productPrice;
    total;
    productQuantity;
    username;

    constructor(id, productName, productPrice, total, productQuantity, username) {
        this.id = id;        
        this.productName = productName;
        this.productPrice = productPrice;
        this.total = total;
        this.productQuantity = productQuantity;
        this.username = username;
    }

    static getAll() {
        return db;
    }

    save() {
        this.id = ++counter; //start with 1
        db.push(this);
        return this;
    }

    edit() {
        const index = db.findIndex((s) => s.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    static delete(id) {
        const index = db.findIndex((s) => s.id == id);
        const deletedItem = db[index];
        db.splice(index, 1);
        return deletedItem;
    } 

    static placeOrder(username) {
        let index = db.findIndex((s) => s.username == username);

        // loop to delete all rows of the user
        while (index >= 0) {
            db.splice(index, 1);
            index = db.findIndex((s) => s.username == username);
        }

        return index;
    }

    static getShoppingCartByUsername(username) {
        return db.filter((s) => s.username === username);
    }

    static getShoppingCartByUsernameProductName(username, productName) {
        return db.find((s) => s.username === username && s.productName === productName);
    }
   
}


module.exports = ShoppingCart;