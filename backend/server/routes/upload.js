const express = require('express');
const { verificatoken } = require('../middlewares/autenticacion');
const fileupload = require('express-fileupload');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();

const Usuario = require('../models/usuario');
const Libro = require('../models/libro');

app.use(fileupload());

app.put('/upload/:ruta/:id', [verificatoken], (req, res) => {
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name);

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }

    let validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
    if (!validExtensions.includes(archivo.mimetype)) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Solo las extensiones <png, jpg, gif, jpeg> son validas'
            }
        });
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
    });

    switch (ruta) {
        case 'libro':
            imgLibro(id, res, nombre);
            break;
        case 'usuario':
            imgUsuario(id, res, nombre);
            break;
        default:
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Ruta no valida'
                }
            });
            break;
    }

});

function imgUsuario(id, res, nombreImagen) {
    Usuario.findById(id, (err, usr) => {
        if (err) {
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usr) {
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        usr.img = nombreImagen;

        usr.save((err, usrDB) => {
            if (err) {
                borrarArchivo(nombreImagen, 'usuario');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                usrDB
            });
        });
    });
}

function imgLibro(id, res, nombreImagen) {
    Libro.findById(id, (err, lib) => {
        if (err) {
            borrarArchivo(nombreImagen, 'libro');
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!lib) {
            borrarArchivo(nombreImagen, 'libro');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Libro no existe'
                }
            });
        }

        lib.img = nombreImagen;

        lib.save((err, libDB) => {
            if (err) {
                borrarArchivo(nombreImagen, 'libro');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                libDB
            });
        });
    });
}

module.exports = app;