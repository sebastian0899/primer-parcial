const {Sequelize}=require('sequelize');
const setUpModels = require('../../db/models');

const sequelize=new Sequelize('formula','postgres','12345',{
    host:'localhost',
    dialect:'postgres',
    logging:true
});

setUpModels(sequelize)

module.exports=sequelize;