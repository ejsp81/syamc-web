var utilfull=require('../helpers/utilfull');
module.exports = class AppointmentUser{
constructor({id,user,schedule,state,observation,licencePlate,date,alliedEntity,}){
this.id=id;
this.user=user;
this.schedule=schedule;
this.state=state;
this.observation=observation;
this.licencePlate=licencePlate;
this.date=date;
this.alliedEntity=alliedEntity;
}
name(capital){
return capital?"AppointmentUser":"appointmentUser"
}
modelObject(){
return {
user:this.user,
schedule:this.schedule,
state:this.state,
observation:this.observation,
licencePlate:this.licencePlate,
date:utilfull.converDate(this.date),
alliedEntity:this.alliedEntity,
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
