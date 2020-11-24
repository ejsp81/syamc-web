var utilfull=require('../helpers/utilfull');
module.exports = class ParametersApp{
constructor({id,parameter,value,description,}){
this.id=id;
this.parameter=parameter;
this.value=value;
this.description=description;
}
name(capital){
return capital?"ParametersApp":"parametersApp"
}
modelObject(){
return {
parameter:this.parameter,
value:utilfull.converArray(this.value),
description:this.description,
}
}
fieldAndTitle(){
return {
parameter:"Parametro",
value:"Valores",
description:"Descripcion",
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
