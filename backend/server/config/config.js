// PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//CONECCION A LA BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  
    urlDB = 'mongodb://localhost:27017/biblioteca';
} else {
    urlDB = 'mongodb+srv://isra:BwrtqMWTPVey0FM9@cluster0-gt04o.mongodb.net/BIBLIOTECA'
}
process.env.URLDB = urlDB;
// EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';