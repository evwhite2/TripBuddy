// click handler to add new user to the Users table
$(".newUserForm").on("submit", event=>{
    event.preventDefault();

    var newUser ={
        firstName : $("#firstName").val().trim(),
        lastName : $("#lastName").val().trim(),
        userName : $("#userName").val().trim(),
        password: $("#password").val().trim(),
        email : $("#email").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/signup", {
        type: "POST",
        data: newUser
      }).then(function() {
          console.log("new user posted");
          // Reload the page to get the updated list
           //location.reload();
        });
    });

$(".newUserForm").on("submit", event=>{
    event.preventDefault();

    var newUser ={
        firstName : $("#firstName").val().trim(),
        lastName : $("#lastName").val().trim(),
        userName : $("#userName").val().trim(),
        password: $("#password").val().trim(),
        email : $("#email").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/signup", {
        type: "POST",
        data: newUser
      }).then(function() {
          console.log("new user posted");
          // Reload the page to get the updated list
          location.reload();
        });
    });

//map:
var mymap = L.map('mapid').setView([45, -100], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZXZ3aGl0ZTIiLCJhIjoiY2s1MzRlc2c3MDRzOTNnbnRlNGw5NDBuciJ9.xmFw1AGepu0Rh-jUgjjzjQ'
}).addTo(mymap);


$("#genRouteForm").on("click", function(){
    $("label").empty();    
});

$("#genRouteForm").on("submit", function(event){
    event.preventDefault();
    var startPt = $("#startPt").val().trim();
    var midPt = $("#midPt").val().trim();
    var endPt = $("#endPt").val().trim();

    var triposoURLs = [
        `https://triposo.com/api/20180206/poi.json?location_id=${startPt}&count=10&account=SZ0URUOA&token=n81y5enq4p7b2syavoiah56iauplghpv`, 
        `https://triposo.com/api/20180206/poi.json?location_id=${midPt}&count=10&account=SZ0URUOA&token=n81y5enq4p7b2syavoiah56iauplghpv`,
        `https://triposo.com/api/20180206/poi.json?location_id=${endPt}&count=10&account=SZ0URUOA&token=n81y5enq4p7b2syavoiah56iauplghpv`
    ];

    // triposoCall(queryURL)

    $.each(triposoURLs, function(index, queryURL){

        $.ajax(queryURL, {type: "GET"}).then(function(response){
            console.log(response);
                //generate various points of interest (POI)
                for (var i=0; i<10; i++){
                    
                    var POIname= response.results[i].name;
                    var POIsnippet = response.results[i].snippet;
                    var lat = response.results[i].coordinates.latitude;
                    var lng = response.results[i].coordinates.longitude;
                    
                    console.log("name: ", POIname, "coordinates: ", lat, lng);

                    //add 1 marker per result
                    var marker = L.marker([lat, lng]).addTo(mymap);
                    marker.bindPopup(POIname).openPopup();
                }
            })
    })
})


