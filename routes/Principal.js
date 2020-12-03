const express = require('express');
const principal = express.Router();
const db = require('../BD/db');
const jwt = require('jsonwebtoken');

principal.post("/nombre",(req, res)=>{
    const decodificar = jwt.decode(req.body.user);
    const id = decodificar.id;
    const query = `SELECT * FROM empleados WHERE id=${id}`;
    db.query(query).then(rows=>{
        res.json({nombre: rows[0].nombre});
        res.status(200);
    }).catch(err=>{
        console.log(err);
        res.status(500);
    })
    
})

principal.post("/insertar",(req, res)=>{
    
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const direccion = req.body.direccion;
    const pass = '';
    const verificar = `SELECT * FROM empleados WHERE telefono='${telefono}' OR correo='${correo}' `;
    db.query(verificar).then(rows=>{
        if(rows.length>0){
            res.status(201);
            res.json({code:0});
        }
        else{
            const query = `INSERT INTO empleados (nombre,apellidos,telefono,correo,direccion, password) VALUES('${nombre}','${apellidos}','${telefono}','${correo}','${direccion}','${pass}');`
            db.query(query).then(rows=>{
                res.status(201);
                res.json({code:1});
            }).catch(err=>{
                console.log(err);
                res.status(500);
                
            })
        }
    }).catch(err=>{
        console.log(err);
        res.status(500);
       
    })
})

principal.post("/buscar_modificacion",(req, res)=>{
    const info = req.body.informacion;
    query = `SELECT * FROM empleados WHERE telefono='${info}' OR correo='${info}'`;
    db.query(query).then(rows=>{
        if(rows.length>0){
            res.status(200);
            res.json(rows);
        }
        else{
            res.json({code:0});
        }
    }).catch(err=>{
        res.status(500);
        res.send("Error");
    })
})

principal.post("/modifica",(req, res)=>{
    const old = req.body.old;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const direccion = req.body.direccion;
    const pass = req.body.pass;
    var repetido=0;

    query = `SELECT * FROM empleados WHERE telefono='${old}' OR correo='${old}'`;
    db.query(query).then(rows=>{

        query2 = `SELECT * FROM empleados WHERE id<>'${rows[0].id}'`;
        db.query(query2).then(rows2=>{
            res.status(200);
            for(var i=0;i<rows2.length;i++){
                if(telefono == rows2[i].telefono || correo == rows2[i].correo){
                    repetido +=1 ;
                }
            }
            if(repetido == 0){
                res.status(200);
                    query3 = `UPDATE empleados SET nombre ='${nombre}', apellidos='${apellidos}', telefono='${telefono}', correo='${correo}', direccion='${direccion}',password='${pass}' WHERE id=${rows[0].id}`; 
                    db.query(query3).then(rows=>{
                        res.status(200);
                        res.json({code:1});
                    }).catch(err=>{
                        res.status(500);
                        res.send("Error");
                    }) 
            }
            else{
                res.status(200);
                res.json({code:0});
            }
        }).catch(err=>{
            res.status(500);
            res.send("Error");
        })
    }).catch(err=>{
        res.status(500);
        res.send("Error");
    })
})

principal.post("/desplegar_eliminado",(req, res)=>{
    var opcion = req.body.opcion;
    query = `SELECT * FROM empleados WHERE correo='${opcion}' OR telefono='${opcion}' `;
    db.query(query).then(rows=>{
        codigo = {code:0}
        if(rows.length>0){
            res.status(200)
            res.json(rows)
        }
        else{
            res.status(200)
            res.json({code:0})
        }
    }).catch(err=>{
        res.status(500)
        res.send("Error")
    })
})

principal.post("/eliminar",(req, res)=>{
    var correo = req.body.correo
    var telefono =  req.body.telefono
    query = `DELETE FROM empleados WHERE correo='${correo}' AND telefono='${telefono}'`
    db.query(query).then(rows=>{
        res.status(200)
        res.json({code: 1})
    }).catch(err=>{
        res.status(500)
        res.json({code:2})
    })
})

principal.post("/buscar", (req, res)=>{
    var busqueda = req.body.busqueda
    if(busqueda!= ""){//en caso de que en el input haya datos hacer query
        query = `SELECT CONCAT(nombre,' ',apellidos) as nombre, id FROM empleados WHERE CONCAT(nombre, ' ', apellidos) LIKE '%${busqueda}%' `
        db.query(query).then(rows=>{
            if(rows.length>0){//si encontro datos mandarlos
                res.status(200)
                datos =[{
                    nombre: '',
                    id: ''
                }]
                for(var i=0;i<rows.length;i++){//encriptamos los id
                    var encriptar = jwt.sign({id:rows[i].id},"nodejskey")
                    var nombre = rows[i].nombre
                    
                    datos.push({"nombre":nombre, "id":encriptar})
                    
                }
                res.json(datos)
            }
            else{
                res.status(200)
                res.json({code:1})
            }
        }).catch(err=>{
            res.status(500)
            res.send("Error")
        })

    }
    else{
        
        res.json({code:0})
    }
})

principal.post("/mostrar_datos",(req, res)=>{
    var id = req.body.id
    var desencriptar = jwt.decode(id)
    query = `SELECT * FROM empleados WHERE id='${desencriptar.id}'`
    db.query(query).then(rows=>{
        res.status(200)
        res.json(rows)
    }).catch(err=>{
        res.status(500)
        res.send("Error")
    })
})

module.exports = principal;