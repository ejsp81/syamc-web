var utilfull=require('../helpers/utilfull');
module.exports = class Schedule{
constructor({id,date,time,alliedEntity,state,typeOfVehicle,inProgress,idUserProgress,observation,infoSchedule,documentReference,}){
this.id=id;
this.date=date;
this.time=time;
this.alliedEntity=alliedEntity;
this.state=state;
this.typeOfVehicle=typeOfVehicle;
this.inProgress=inProgress;
this.idUserProgress=idUserProgress;
this.observation=observation;
this.infoSchedule=infoSchedule;
this.documentReference=documentReference;
}
name(capital){
return capital?"Schedule":"schedule"
}
modelObject(){
return {
date:utilfull.converDate(this.date),
time:parseInt(this.time),
alliedEntity:this.alliedEntity,
state:this.state,
typeOfVehicle:this.typeOfVehicle,
inProgress:this.inProgress,
idUserProgress:this.idUserProgress,
observation:this.observation,
infoSchedule:this.infoSchedule,
documentReference:this.documentReference,
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
