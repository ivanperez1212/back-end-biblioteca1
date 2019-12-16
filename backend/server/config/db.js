//CONECCION A LA BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://isra:isra@cluster0-gt04o.mongodb.net/BIBLIOTECA'
} else {
    urlDB = 'mongodb://localhost:27017/biblioteca';
}
process.env.URLDB = urlDB;