       

// When the user clicks on the button, open the modal to save trip name
$("#saveTrip").on("click", function(event1){
    event1.preventDefault()
    $(".modal").attr("style", "display: block;")
})

$("#saveTripName").on("click", function(event2){
    event2.preventDefault();

    console.log(startPt.value, midPt.value, endPt.value)

    var tripName = $("#tripName").val().trim();

    var newTrip = {
        tripName: tripName,
        startPt: startPt.value,
        midPt: midPt.value,
        endPt: endPt.value
    };

    $.ajax("/api/trips",{
        type: "POST",
        data: newTrip
    }).then(()=>{
        console.log("added");
    })

    $(".modal").attr("style", "display: none;")
})

$(".savePOI").click(function(){
    console.log("test")
});

$(".delTrip").on("click", function(){
    var id = $(this).data("id")
    console.log("id", id)

    $.ajax("/api/trips/"+id, {
        type:"DELETE"
    })
})


//map:
var mymap = L.map('mapid').setView([45, -100], 4);

var snippets = [];
var snippetCards = [];

function fixInput(cityName){
    capArray = cityName.split("");
    var cap1 = capArray[0].toUpperCase();
    capArray.splice(0, 1, cap1);
    cityName = capArray.join("")
    return cityName 
}

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
    $(".searchResultCards").empty();

    var inputArray= [];
    var callArray = [];

    // fix user input to add underscores and capitalized per triposo API:
    function fixWord(cityName){
        updatedCity = []
        cityArray = cityName.split(" ");
        cityArray.forEach(word=>{
            var first = word.charAt(0).toUpperCase();
            word = word.split("");
            word.splice(0, 1, first);
            word = word.join("")
            updatedCity.push(word)
            
        })
            cityName= updatedCity.join("_");
            return cityName;
            
    }

    var startPt = $("#startPt").val().trim();
    var midPt = $("#midPt").val().trim();
    var endPt = $("#endPt").val().trim();
    
    inputArray.push(startPt, midPt, endPt)

    inputArray.forEach(city =>{
        city = fixWord(city)
        callArray.push(city)
    })

    console.log("Calling cities ", callArray)

    if(callArray[0]===""){alert("Please enter at least a starting point begin")}
    
    var triposoURLs = [
        `https://triposo.com/api/20180206/poi.json?location_id=${callArray[0]}&count=10&account=SZ0URUOA&token=n81y5enq4p7b2syavoiah56iauplghpv`, 
        `https://triposo.com/api/20180206/poi.json?location_id=${callArray[1]}&count=10&account=SZ0URUOA&token=n81y5enq4p7b2syavoiah56iauplghpv`,
        `https://triposo.com/api/20180206/poi.json?location_id=${callArray[2]}&count=10&account=SZ0URUOA&token=n81y5enq4p7b2syavoiah56iauplghpv`
    ];

    snippets = [];
    snippetCards = [];
    
    $.each(triposoURLs, function(index, queryURL){

        $.ajax(queryURL, {type: "GET"}).then(function(response){
                
                //generate various points of interest (POI)
                for (var i=0; i<10; i++){
                    
                    var POIname= response.results[i].name;
                    var POIsnippet = response.results[i].snippet;
                    var lat = response.results[i].coordinates.latitude;
                    var lng = response.results[i].coordinates.longitude;
                    

                    //add 1 marker per result
                    var marker = L.marker([lat, lng]).addTo(mymap);
                    marker.bindPopup(POIname).openPopup();

                        var newCard = `
                        <div class="card horizontal">
                        <div class="card-stacked">
                          <div class="card-content">
                            <h6>${POIname}</h6>
                            <p>${POIsnippet}</p>
                          </div>
                          </div>
                          <button class="savePOI">Save</button>
                        </div>`
                    
        
                    $(".searchResultCards").append(newCard);
                        
                }
        })
    
    });
})

