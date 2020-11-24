var utilfull=require('../helpers/utilfull');
module.exports = class Users{
constructor({id,names,surnames,celphone,dateBirth,address,email,photoUrl,password,idPersonal,uid,registrationDate,fullName,accountStatus,dataPercentage,documentType,vehicle,documentReference,termsAndConditions,}){
this.id=id;
this.names=names;
this.surnames=surnames;
this.celphone=celphone;
this.dateBirth=dateBirth;
this.address=address;
this.email=email;
this.photoUrl=photoUrl;
this.password=password;
this.idPersonal=idPersonal;
this.uid=uid;
this.registrationDate=registrationDate;
this.fullName=fullName;
this.accountStatus=accountStatus;
this.dataPercentage=dataPercentage;
this.documentType=documentType;
this.vehicle=vehicle;
this.documentReference=documentReference;
this.termsAndConditions=termsAndConditions;
}
name(capital){
return capital?"Users":"users"
}
modelObject(){
return {
names:this.names,
surnames:this.surnames,
celphone:this.celphone,
dateBirth:utilfull.converDate(this.dateBirth),
address:this.address,
email:this.email,
photoUrl:this.photoUrl,
password:this.password,
idPersonal:this.idPersonal,
uid:this.uid,
registrationDate:utilfull.converDate(this.registrationDate),
fullName:this.fullName,
accountStatus:this.accountStatus,
dataPercentage:parseInt(this.dataPercentage),
documentType:this.documentType,
vehicle:utilfull.converArray(this.vehicle),
documentReference:this.documentReference,
termsAndConditions:this.termsAndConditions,
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
