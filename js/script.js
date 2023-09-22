// // Initialize the map
// var map = L.map('map').setView([39.8283, -98.5795], 4); // Centered on the USA

// // Add a tile layer (you can choose a different tile provider)
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// // Load your coordinates from JSON file
// fetch('data/coordinates.json')
//     .then(response => response.json())
//     .then(data => {
//         // Loop through the coordinates and add markers to the map
//         data.forEach(coordinate => {
//             L.marker([coordinate.lat, coordinate.lng]).addTo(map);
//         });
//     })
//     .catch(error => {
//         console.error('Error loading coordinates:', error);
//     });
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// const { getDatabase } = require("https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js");


var map = L.map('map').setView([20.593, 79.9629], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const appSettings = {
    databaseURL: "https://scanmilk-2f9a8-default-rtdb.firebaseio.com"
}
const app = initializeApp(appSettings)
var database = getDatabase(app);
// Reference to the data you want to retrieve (replace 'coordinates' with your actual database path)
const coordinatesRef = ref(database, 'newData2');
const totalScansLabel = document.getElementById('total-scans');

// Now, you can manipulate the label or its content as needed
// For example, changing the text of the label:


// Initialize the map (as shown in the previous code)

// Load data from Firebase and add markers to the map

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


onValue(coordinatesRef, function(snapshot){
    
    let arrayVal = Object.values(snapshot.val())
    console.log(arrayVal);
    totalScansLabel.querySelector('p').textContent = arrayVal[0].length.toString();
    for(let i = 0; i<arrayVal[0].length; i++){
        // console.log(arrayVal[0][3].lat);
        let lat = arrayVal[0][i].lat;
        let long = arrayVal[0][i].long;
        let safety = arrayVal[0][i].safe;

        if (safety === true){
            L.marker([lat,long], {icon: greenIcon}).addTo(map);
        } else {
            L.marker([lat,long], {icon: redIcon}).addTo(map);
        }
        // console.log(arrayVal[0][i].lat);
        
        // L.marker([arrayVal[i].lat, arrayVal[i].long], {icon: greenIcon}).addTo(map);
    }
    // console.log(snapshot);
});

// coordinatesRef.on('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//         var coordinate = childSnapshot.val();
//         L.marker([coordinate.lat, coordinate.long]).addTo(map);
//     });
// });


// fetch('js/coordinates.json')
//     .then(response => response.json())
//     .then(data => {
//         // Loop through the coordinates and add markers to the map
//         data.forEach(coordinate => {
//             L.marker([coordinate.lat, coordinate.lng]).addTo(map);
//         });
//     })
//     .catch(error => {
//         console.error('Error loading coordinates:', error);
//     });