const express = require('express');
const _ = require('underscore');
const { verificatoken } = require('../middlewares/autenticacion');
const Prestamo = require('../models/prestamo');
const app = express();

app.get('/prestamo', [verificatoken], (req, res) => {
    Prestamo.find({ prestado: true })
        .populate('usuario')
        .populate('libro')
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            })
        });
});

app.post('/prestamo', [verificatoken], (req, res) => {
    let body = req.body;

    let prestamo = new Prestamo({
        libro: body.libro,
        usuario: body.usuario,
        fecha: body.fecha
    });
    prestamo.save((err, presDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            presDB
        });
    });
});

app.put('/prestamo', [verificatoken], (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['libro', 'usuario', 'fecha']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, presDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            presDB
        });
    });
});

app.delete('/prestamo', [verificatoken], (req, res) => {
    let id = req.body.id;
    Prestamo.findByIdAndUpdate(id, { prestado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;