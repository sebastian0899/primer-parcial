const express =require('express')
const router=express.Router()
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 


const {readfile, writefile} = require('../file');
const FILE_NAME = './db/formula.txt';
// API
// Listar   Equipo
router.get('/', (req, res)=>{
    const data = readfile(FILE_NAME);
    const {search} = req.query;
    if(search){
        const filteredPets = data.filter(formu => formu.name.toLowerCase().includes(search.toLowerCase()));
        return res.render('formula/index', { formula: filteredFormula });
    }
    res.json(data);
})

//

//Crear Equipo
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports=router;