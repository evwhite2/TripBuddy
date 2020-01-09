const fs = require('fs'); 
const csv = require('csv-parser');
const mysql = require('mysql');
var results= [];

fs.createReadStream("./uscities-TESTFILE.csv")
.pipe(csv(['city', 'state_id', 'county_name', 'lat', 'lng']))
.on('data', function(data){
    console.log(data);

    try {
        results.push(data);
    }
    catch(err) {
        if(err) throw err;
    }
})
.on('end',function(){
    results.shift();
    console.log("after shift: "+results)

    const connection = mysql.createConnection({
        host: 'localhost',
        port: 8080,
		user: 'root',
		password: 'root',
		database: 'tripBuddy_db'
    });
    
    connection.connect((err)=>{
        if(err) throw err;
    
            let query = "INSERT INTO US_Cities(city, state_id, county_name, lat, lng) VALUES ?"
            connection.query(query, results, (error, response)=>{
                if(error) throw error
                
                    console.log(response);
            
            })    

        console.log("complete");
        connection.end();
    });
    
});  