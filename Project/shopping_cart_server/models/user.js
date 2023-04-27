
 class User {
    id;
    username;
    password;
    constructor(id, username, password) {
      this.id = id;
      this.username = username;
      this.password = password;
    }

    static getAll() {
        return db;
    }
  
    save() {
      db.push(this);
      return this;
    } 
    
  
    static login(username, password) {
        const index = db.findIndex((u) => u.username === username && u.password === password);
        if (index >= 0)
        {
            return { username: db[index].username, logindate: new Date() };
        }

        return null;
    }
}

let db = [];
let user1 = new User(1, 'danle', '123123');
let user2 = new User(2, 'john', '123456');
let user3 = new User(3, 'mike', '123789');
let user4 = new User(4, 'pete', '123321');
db.push(user1);
db.push(user2);
db.push(user3);
db.push(user4);
  
module.exports = User;