const express = require('express');
const loginRouter = require('./routes/loginRouter');
const productRouter = require('./routes/productRouter');
const shoppingCartRouter = require('./routes/shoppingCartRouter');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/shoppingcarts', shoppingCartRouter);

//error handling
app.use((err, req, res, next) => {
  res.status(500).json(err.message);
});

app.listen(3000, () => console.log('Listening on port 3000!'));