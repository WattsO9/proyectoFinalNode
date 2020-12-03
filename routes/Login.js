const db = require('../BD/db');
const express = require('express');
const login = express.Router();
const jwt = require('jsonwebtoken');

login.post("/verificar",(req,res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    const query = `SELECT * FROM empleados WHERE password ='${pass}' AND correo = '${email}'`;

    db.query(query).then(rows=>{
        if(rows.length >=1 && rows[0].id <=3){
            const encriptar = jwt.sign({id:rows[0].id},"nodejskey");
            
            res.status(200).json({code:200,id: encriptar,nombre:rows[0].nombre});
        }
        else if(rows.length>=1 && rows[0].id >3){
            res.status(200).json({code:200});
        }
        else{
            res.json({code:500, mensaje:"Correo y/o contraseña incorrectos"});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500);
        res.setEncoding("Server error");
    })
})


module.exports = login;