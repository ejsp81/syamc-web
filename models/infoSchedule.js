module.exports = class InfoSchedule{
constructor({idUser,nameUser,licencePlate,obervation,urlLicencePlate,}){
this.idUser=idUser;
this.nameUser=nameUser;
this.licencePlate=licencePlate;
this.obervation=obervation;
this.urlLicencePlate=urlLicencePlate;
}
name(capital){
return capital?"InfoSchedule":"infoSchedule"
}
modelObject(){
return {
idUser:this.idUser,
nameUser:this.nameUser,
licencePlate:this.licencePlate,
obervation:this.obervation,
urlLicencePlate:this.urlLicencePlate,
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
