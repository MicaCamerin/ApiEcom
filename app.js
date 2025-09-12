
const express = require('express');
const app = express();
const PORT = 8080;

//Handlebar
const handlebars = require("express-handlebars");

app.engine("hbs", handlebars.engine({
extname: ".hbs",
defaultLayout: "main",
}));

app.set("view engine", "hbs");
app.set("views", paths.view);

app.use(express.json());


const productsRouter = require('./src/routes/products.routes');
const cartsRouter = require('./src/routes/carts.routes');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.get('/', (req, res) => {
    res.send('Servidor funcionando - Backend Entrega I');
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});