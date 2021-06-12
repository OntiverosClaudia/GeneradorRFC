/*jshint esversion: 6 */

//importar modulos 
const { resolveInclude } = require('ejs');
const express = require('express');
const path = require('path');
const llamado = require('./funcion');

//Creamos un objeto de Router Express
const router = express.Router();

//Exportar nuestro modulo ROUTES
module.exports = router;

const Middleware = function (req, res, next) {
    var letras = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var digitos = '0123456789';
    for ( var i = 0; i < 2; i++ ) {
        // Se generan 2 letras y un numero
        letras += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        if(i == 1)
        {
            digito = digitos.charAt(Math.round(Math.random()*10));
        }
    }
    var generado = letras + digito;
    req.Middleware = generado;
    next();
}

router.get('/', (req, res) =>{
    res.render('pages/home');
});

router.post('/', Middleware, (req, res) =>{
    var RFC = llamado.Calcular(req.body) + req.Middleware;
    res.render('pages/RFC', {datos: req.body, MostrarRFC: RFC});
});

router.get('/about', (req, res) =>{
    const users = [
    {name: "Holy", email: "holy.gmail.com", avatar: "http://placekitten.com/300/300"},
    {name: "Chris", email: "chris.gmail.com", avatar: "http://placekitten.com/400/400"},
    {name: "Aldo", email: "aldo.gmail.com", avatar: "http://placekitten.com/500/500"},
    {name: "Sam", email: "sam.gmail.com", avatar: "http://placekitten.com/700/700"},
    ];
    res.render('pages/about', {usuarios:users});
});

router.get('/contact', (req, res) =>{
    res.render('pages/contact');
});

router.post('/contact', (req, res)=>{
    console.log(req.body.nombre);
    console.log(req.body.correo);
    console.log(req.body.mensaje);
    //res.render('pages/contact');
});