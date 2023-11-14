const express =require('express')
const router=express.Router()
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 

const {readfile, writefile} = require('../file');
const FILE_NAME = './db/formula.txt';
const {models} = require('../libs/sequelize');

//WEB
// Listar equipo
router.get('/',async (req, res)=>{
    //const data = readFile(FILE_NAME);
    //res.render('equipo/index', { formula: data });
    const {search}=req.query;
    let formula=await models.Formu.findAll();
    console.log(formula)
    res.render('formula/index',{formula:formula, search:search})
});

//Eliminar equipo
router.post('/delete/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    //const id = req.params.id
    //Leer el contenido del archivo
    //const equipo = readFile(FILE_NAME)
    // Buscar el equipo con el ID que recibimos
    //const equipIndex = equipo.findIndex(equ => equ.id === id )
    //if( equipIndex < 0 ){// Si no se encuentra el equipo con ese ID
      //  res.status(404).json({'ok': false, message:"equipo not found"});
        //return;
    //}
    //Eliminar el equipo que esté en la posición equipIndex
    //equipo.splice(equipIndex, 1);
    //writeFile(FILE_NAME, equipo)
    models.Formu.destroy({
        where:{
            id:id
        }
    });
    res.redirect('/formula');
})

//Crear equipo
router.get('/create', (req, res)=>{
    //Mostrar el formulario
    res.render('formula/create');
});

router.post('/',async (req, res) => {
    try {
        //Leer el archivo 
        //const data = readFile(FILE_NAME);
        //Agregar (Agregar ID)
        //const newEqipo = req.body;
        //newEqipo.id = uuidv4();
        //console.log(newEqipo)
        //data.push(newEqipo);
        // Escribir en el archivo
        //writeFile(FILE_NAME, data);
        const newEquipo=await models.Formu.create(req.body);
        res.redirect('/formula' );
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al crear el equipo' });
    }
});

module.exports=router;
