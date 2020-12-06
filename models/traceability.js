var utilfull=require('../helpers/utilfull');
module.exports = class Traceability{
constructor({id,idSchedule,idUser,state,obervation,date,}){
this.id=id;
this.idSchedule=idSchedule;
this.idUser=idUser;
this.state=state;
this.obervation=obervation;
this.date=date;
}
name(capital){
return capital?"Traceability":"traceability"
}
modelObject(){
return {
idSchedule:this.idSchedule,
idUser:this.idUser,
state:this.state,
obervation:this.obervation,
date:utilfull.converDate(this.date),
}
}
fieldAndTitle(){
return {
}
}
toJSON(includeUndefined) {
return Object.getOwnPropertyNames(this).reduce((a, b) => {
if (this[b]==undefined) {
if (includeUndefined) {
a[b] = this[b];
}
} else {
a[b] = this[b];
}
return a
}, {});
}

}
