var utilfull=require('../helpers/utilfull');
module.exports = class AdvertisingApp{
constructor({id,description,urlImage,priority,alliedEntity,startDate,endDate,}){
this.id=id;
this.description=description;
this.urlImage=urlImage;
this.priority=priority;
this.alliedEntity=alliedEntity;
this.startDate=startDate;
this.endDate=endDate;
}
name(capital){
return capital?"AdvertisingApp":"advertisingApp"
}
modelObject(){
return {
description:this.description,
urlImage:this.urlImage,
priority:parseInt(this.priority),
alliedEntity:this.alliedEntity,
startDate:utilfull.converDate(this.startDate),
endDate:utilfull.converDate(this.endDate),
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
