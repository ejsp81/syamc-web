var utilfull=require('../helpers/utilfull');
module.exports = class AlliedEntity{
constructor({id,businessName,manager,phone1,phone2,celphon1,celphon2,address,description,location,urlPageWeb,businessActivity,urlLogo,documentReference,serviceProvide,userAccount,email,}){
this.id=id;
this.businessName=businessName;
this.manager=manager;
this.phone1=phone1;
this.phone2=phone2;
this.celphon1=celphon1;
this.celphon2=celphon2;
this.address=address;
this.description=description;
this.location=location;
this.urlPageWeb=urlPageWeb;
this.businessActivity=businessActivity;
this.urlLogo=urlLogo;
this.documentReference=documentReference;
this.serviceProvide=serviceProvide;
this.userAccount=userAccount;
this.email=email;
}
name(capital){
return capital?"AlliedEntity":"alliedEntity"
}
modelObject(){
return {
businessName:this.businessName,
manager:this.manager,
phone1:this.phone1,
phone2:this.phone2,
celphon1:this.celphon1,
celphon2:this.celphon2,
address:this.address,
description:this.description,
location:this.location,
urlPageWeb:this.urlPageWeb,
businessActivity:utilfull.converArray(this.businessActivity),
urlLogo:this.urlLogo,
documentReference:this.documentReference,
serviceProvide:utilfull.converArray(this.serviceProvide),
userAccount:this.userAccount,
email:this.email,
}
}
fieldAndTitle(){
return {
businessName:"Nombre del negocio",
manager:"Nombre del gerente",
phone1:"Telefono 1",
phone2:"Telefono 2",
celphon1:"Celular 1",
celphon2:"Celular 2",
address:"Direccion",
description:"Descripcion",
location:"Ubicación",
urlPageWeb:"Pagina Web",
businessActivity:"Actividad del Negocio",
urlLogo:"Url del logo",
serviceProvide:"Servicios que presta",
userAccount:"Cuenta de Usuario",
email:"Email",
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
