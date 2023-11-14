const {Model, DataTypes}=require('sequelize');

const FORMULA_TABLE='formula';

const FormulaSchema={
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    pilot:{
        type:DataTypes.STRING,
        allowNull: false
    },
    TechnicalManager:{
        type:DataTypes.STRING,
        allowNull: false
    },
    Firstseason:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    Championships:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    Chassis:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    tires:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
    
};

class FormulaModel extends Model{
    static associate(models){
         
    }
    static confing (sequelize){
        return{
            sequelize, 
            modelName:'formu',
            tableName:FORMULA_TABLE,
            timestamps:false
        }
    }
}

module.exports={FormulaModel, FormulaSchema, FORMULA_TABLE};