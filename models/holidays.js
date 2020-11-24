var utilfull=require('../helpers/utilfull');
module.exports = class Holidays{
constructor({id,date,description,}){
this.id=id;
this.date=date;
this.description=description;
}
name(capital){
return capital?"Holidays":"holidays"
}
modelObject(){
return {
date:utilfull.converDate(this.date),
description:this.description,
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
