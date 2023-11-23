//Vamos a crear una API 
var express = require('express');
var mysql = require('mysql');


var conexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database:'pw1011'
    }
);
//Probamos la conexion
//(function(error){if(errro){throw error;}else{console.log("Conexion correcta");}});
conexion.connect((error)=>error?console.log(error):console.log("Conexion correcta"));


//Activar el modulo de express
var app = express();//Ejecuta el constructor de express
//Express es para escuchar peticiones http del lado del servidor

//El req son los verbos http y el res son las respuestas
/*function(req, res)
{
    res.send("<h1>Ruta de inicio con nodemon</h1>");
} */
app.get("/", (req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));//El primer parametro es la ruta y el segundo es una funcion que recibe dos parametros: req y res

app.get('/api/alumnos', (req, res)=>
    {
        conexion.query("Select * from alumnos", 
                    (error, fila)=>
                    {
                        if(error)
                        {
                            throw error;
                        }
                        else
                        {
                            res.send(fila);
                        }
                    }
        )
    }
);

app.get('/api/alumnos/:id', (req,res)=>{
    //El = ? significa parámetro pendiente
    conexion.query('select * from alumnos where ncontrol = ? LIMIT 1', [req.params.id], 
    (error, fila)=>
    {   
        if(error)
        {
            throw error;
        }
        else
        {
            res.send(fila);
        }
    }
    )
});

//Configurar el servidor
/* function()
{
    console.log("El servidor esta corriendo en el puerto 3000");
}*/
app.listen("3000", ()=>console.log("El servidor esta corriendo en el puerto 3000"));//El puerto 80 es el puerto por defecto para http y la api debe tener uno distinto


