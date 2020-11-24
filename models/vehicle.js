var utilfull=require('../helpers/utilfull');
module.exports = class Vehicle{
constructor({id,licencePlate,vehicleType,urlProtertyCard,urlSoat,vehicleModel,validitySOAT,validityTecno,lastOilChange,dataLicencePlate,}){
this.id=id;
this.licencePlate=licencePlate;
this.vehicleType=vehicleType;
this.urlProtertyCard=urlProtertyCard;
this.urlSoat=urlSoat;
this.vehicleModel=vehicleModel;
this.validitySOAT=validitySOAT;
this.validityTecno=validityTecno;
this.lastOilChange=lastOilChange;
this.dataLicencePlate=dataLicencePlate;
}
name(capital){
return capital?"Vehicle":"vehicle"
}
modelObject(){
return {
licencePlate:this.licencePlate,
vehicleType:this.vehicleType,
urlProtertyCard:this.urlProtertyCard,
urlSoat:this.urlSoat,
vehicleModel:this.vehicleModel,
validitySOAT:utilfull.converDate(this.validitySOAT),
validityTecno:utilfull.converDate(this.validityTecno),
lastOilChange:this.lastOilChange,
dataLicencePlate:this.dataLicencePlate,
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
