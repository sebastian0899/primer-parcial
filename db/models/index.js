const {FormulaModel,FormulaSchema}=require('./formula.model');

function setUpModels(sequelize){
    FormulaModel.init(FormulaSchema,FormulaModel.confing(sequelize));
}
module.exports=setUpModels;