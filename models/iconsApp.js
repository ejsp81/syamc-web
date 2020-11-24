module.exports = class IconsApp{
constructor({id,reference,urlImage,}){
this.id=id;
this.reference=reference;
this.urlImage=urlImage;
}
name(capital){
return capital?"IconsApp":"iconsApp"
}
modelObject(){
return {
reference:this.reference,
urlImage:this.urlImage,
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
