var utilfull=require('../helpers/utilfull');
module.exports = class PicoYPlaca{
constructor({id,city,beginningOfValidity,endOfValidity,weekDay,digits,schedule,observation,}){
this.id=id;
this.city=city;
this.beginningOfValidity=beginningOfValidity;
this.endOfValidity=endOfValidity;
this.weekDay=weekDay;
this.digits=digits;
this.schedule=schedule;
this.observation=observation;
}
name(capital){
return capital?"PicoYPlaca":"picoYPlaca"
}
modelObject(){
return {
city:this.city,
beginningOfValidity:utilfull.converDate(this.beginningOfValidity),
endOfValidity:utilfull.converDate(this.endOfValidity),
weekDay:this.weekDay,
digits:utilfull.converArray(this.digits),
schedule:utilfull.converArray(this.schedule),
observation:this.observation,
}
}
fieldAndTitle(){
return {
city:"Ciudad",
beginningOfValidity:"Inicio de Vigencia",
endOfValidity:"Fin de Vigencia",
weekDay:"Dia Semana",
digits:"Digitos",
schedule:"Horario",
observation:"Observacion",
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
