module.exports = class Profile{
constructor({id,prifile,description,}){
this.id=id;
this.prifile=prifile;
this.description=description;
}
name(capital){
return capital?"Profile":"profile"
}
modelObject(){
return {
prifile:this.prifile,
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
