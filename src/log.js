const fs = require('fs');

module.exports = {
    saveLog
};
function saveLog(data,name){
    try {
        fs.writeFileSync(name,data);
    } catch (error) {
        console.error(error);
    }
}