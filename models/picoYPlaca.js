var utilfull=require('../helpers/utilfull');
module.exports = class PicoYPlaca{
constructor({id,city,beginningOfValidity,endOfValidity,information,urlCity,schedule,observation,generalObservation,decree,}){
this.id=id;
this.city=city;
this.beginningOfValidity=beginningOfValidity;
this.endOfValidity=endOfValidity;
this.information=information;
this.urlCity=urlCity;
this.schedule=schedule;
this.observation=observation;
this.generalObservation=generalObservation;
this.decree=decree;
}
name(capital){
return capital?"PicoYPlaca":"picoYPlaca"
}
modelObject(){
return {
city:this.city,
beginningOfValidity:utilfull.converDate(this.beginningOfValidity),
endOfValidity:utilfull.converDate(this.endOfValidity),
information:this.information,
urlCity:this.urlCity,
schedule:utilfull.converArray(this.schedule),
observation:this.observation,
generalObservation:this.generalObservation,
decree:this.decree,
}
}
fieldAndTitle(){
return {
city:"Ciudad",
beginningOfValidity:"Inicio de Vigencia",
endOfValidity:"Fin de Vigencia",
information:"Dia Semana",
urlCity:"Digitos",
schedule:"Horario",
observation:"Observacion",
generalObservation:"observacion General",
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
