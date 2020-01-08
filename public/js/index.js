
//DO NOT write additional code above this map, otherwise it will not render.

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
})

$("#genRouteForm").on("submit", function(event){
    event.preventDefault();

    var startPt = $("#startPt").val().trim();
    var midPt = $("#midPt").val().trim();
    var endPt = $("#endPt").val().trim();



    // L.circle([45, -100], {radius: 200}).addTo(mymap);

    

})

mymap.on('click', function(e) {
    alert(e.latlng);

    console.log(e)
} );

//once we have information we would like to display based on user search, we can add the text into this popup to appear on the map:

// var marker = L.marker([{lat}, {long}]).addTo(mymap);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();


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
    $.ajax("/api/users", {
        type: "POST",
        data: newUser
      }).then(function() {
          console.log("new user posted");
          // Reload the page to get the updated list
        //   location.reload();
        });
    });