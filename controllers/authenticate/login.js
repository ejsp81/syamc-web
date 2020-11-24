var login =function(user,password){

    console.log(user,password)
    if(user==="ejsp81@hotmail.com" && password==="123"){
        return true;
    }
    else{
        return false;
    }
}

module.exports=login;