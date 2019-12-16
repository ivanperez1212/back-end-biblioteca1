const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Libro = require('./libro');

let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Por favor ingresa el id del usuario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el id del usuario']
    },
    fecha: {
        type: String
    },
    prestado: {
        type: Boolean,
        default: true
    }
});

prestamoSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);