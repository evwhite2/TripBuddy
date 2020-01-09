const axios = require("axios");

var triposoCall = function(queryURL) {
// const queryURL = "https://triposo.com/api/20180206/poi.json?location_id={New_York_City}&count=10&account=SZ0URUOA&token=n81y5enq4p7b2syavoiah56iauplghpv";

axios
    .get(queryURL)
    .then(function(response){
        for (i=0; i<10; i++){
            console.log(response.data.results[i].coordinates, response.data.results[i].name)
        } 
    })
    .catch(function(error){
        console.log(error)
    })
}

module.exports = triposoCall;