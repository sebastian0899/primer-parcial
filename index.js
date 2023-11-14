require('dotenv').config()
const express = require ('express');
const fs = require('fs');
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 

const {readFile, writeFile} = require('./src/file');
const formula_api=require('./src/routers/formula_api');
const formula=require('./src/routers/formula')
const {saveLog} = require('./src/log');
const { number } = require('joi');
const app = express();
const PORT =process.env.PORT || 3000;
const APP_NAME=process.env.APP_NAME || 'My app'
const FILE_NAME = './db/formula.txt';
const LOG_NAME='./db/log.txt';
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//Usar el motor de plantillas de EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/api/formula',formula_api);
app.use('/formula',formula);




app.listen(PORT,()=>{
    console.log(`${APP_NAME} is running on http://localhost:${PORT}`)
})


 

