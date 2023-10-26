require('dotenv').config()
const express = require ('express');
const fs = require('fs');
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 

const {readFile, writeFile} = require('./src/file');
const {saveLog} = require('./src/log');
const { number } = require('joi');
const app = express();
const FILE_NAME = './db/formula.txt';
const LOG_NAME='./db/log.txt';
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//Usar el motor de plantillas de EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');

//WEB
// Listar equipo
app.get('/formula', (req, res)=>{
    const data = readFile(FILE_NAME);
    res.render('equipo/index', { formula: data });
});

//Eliminar equipo
app.post('/formula/delete/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const equipo = readFile(FILE_NAME)
    // Buscar el equipo con el ID que recibimos
    const equipIndex = equipo.findIndex(equ => equ.id === id )
    if( equipIndex < 0 ){// Si no se encuentra el equipo con ese ID
        res.status(404).json({'ok': false, message:"equipo not found"});
        return;
    }
    //Eliminar el equipo que esté en la posición equipIndex
    equipo.splice(equipIndex, 1);
    writeFile(FILE_NAME, equipo)
    res.redirect('/formula');
})

//Crear equipo
app.get('/formula/create', (req, res)=>{
    //Mostrar el formulario
    res.render('formula/create');
});

app.post('/formula', (req, res) => {
    try {
        //Leer el archivo 
        const data = readFile(FILE_NAME);
        //Agregar (Agregar ID)
        const newEqipo = req.body;
        newEqipo.id = uuidv4();
        console.log(newEqipo)
        data.push(newEqipo);
        // Escribir en el archivo
        writeFile(FILE_NAME, data);
        res.redirect('/formula' );
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al almacenar el equipo' });
    }
});

// API
// Listar   Equipo
app.get('/api/formula', (req, res)=>{
    const metodo = req.method; // Obtener el método HTTP (por ejemplo, 'GET') 
    const fechaHora = new Date();
    saveLog(`${fechaHora}  ${metodo},  /api/formula`);
    const equipo=req.query.team;
    let data = readFile(FILE_NAME);
    if(equipo !== undefined){  
        data=data.filter(team => team.name===equipo);
    } 

    
    res.json(data);
})

//

//Crear Equipo
app.post('/api/formula', (req, res) => {
    try {
        //Leer el archivo 
        const data = readFile(FILE_NAME);
        const time = new Date();
        const msg = time+" POST crear equipo /api/formula";
        //Agregar (Agregar ID)
        const newEqipo = req.body;
        newEqipo.id = uuidv4();
        console.log(newEqipo)
        data.push(newEqipo);
        // Escribir en el archivo
        writeFile(FILE_NAME, data);
        res.json({ message: 'El equipo fue creado con exito' });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al almacenar el equipo' });
    }
});

//Obtener una solo equipo 
app.get('/api/formula/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    const time = new Date();
    const msg = time+" GET obtener equipos /api/formula";
    const id = req.params.id
    //Leer el contenido del archivo
    const equipo = readFile(FILE_NAME)
    // Buscar la mascota con el ID que recibimos
    const equFound = equipo.find(equ => equ.id === id )
    if(!equFound){// Si no se encuentra el equipo con ese ID
        res.status(404).json({'ok': false, message:"equipo not found"})
        return;
    }
    res.json({'ok': true, equ: equFound});
})


//Actualizar equipo
app.put('/api/formula/:id', (req, res) => {
    console.log(req.params.id);
    const time = new Date();
    const msg = time+" GET listar equipos /api/formula";
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const equipo = readFile(FILE_NAME)
    // Buscar el equipo con el ID que recibimos
    const equipIndex = equipo.findIndex(equ => equ.id === id )
    if( equipIndex < 0 ){// Si no se encuentra el equipo con ese ID
        res.status(404).json({'ok': false, message:"equipo not found"});
        return;
    }
    let equ = equipo[equipIndex]; //Sacar del arreglo
    equ = { ...equ, ...req.body  };
    equipo[equipIndex] = equ; //Poner el equipo en el mismo lugar
    writeFile(FILE_NAME, equipo);
    //Si el equipo existe, modificar sus datos y almacenarlo nuevamente
    res.json({'ok': true, equ: equ});
})


//Eliminar un equipo
app.delete('/api/formula/:id', (req, res) => {
    console.log(req.params.id);
    const time = new Date();
    const msg = time+" GET listar equipos /api/formula";
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const equipo = readFile(FILE_NAME)
    // Buscar el equipo con el ID que recibimos
    const equipIndex = equipo.findIndex(equ => equ.id === id )
    if( equipIndex < 0 ){// Si no se encuentra el equipo con ese ID
        res.status(404).json({'ok': false, message:"Pet not found"});
        return;
    }
    //Eliminar el equipo que esté en la posición equipIndex
    equipo.splice(equipIndex, 1);
    writeFile(FILE_NAME, equipo)
    res.json({'ok': true});
})



app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000')
})

 

