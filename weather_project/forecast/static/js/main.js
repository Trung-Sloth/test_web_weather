document.addEventListener('DOMContentLoaded', () => {
  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  const firebaseConfig = {
    apiKey: "AIzaSyAmd8V46CLS11cyu1UnjqBwtcBUXybnyNA",
    authDomain: "map-1-b0eae.firebaseapp.com",
    databaseURL: "https://map-1-b0eae-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "map-1-b0eae",
    storageBucket: "map-1-b0eae.appspot.com",
  };

  function createPersistentPopup(marker, content) {
    const popup = L.popup({
      autoClose: false,
      closeOnClick: false,
      closeButton: true,
      className: 'custom-popup' // bạn có thể thêm class để style thêm
    })
      .setContent(content);

    marker.bindPopup(popup).openPopup();
    return popup;
  }

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const map = L.map('map');
  var lastLat1 = 0, lastLng1 = 0, lastLat2 = 0, lastLng2 = 0, lastLat3 = 0, lastLng3 = 0;
  var ref1 = db.ref("Toa-do-1");
  var ref2 = db.ref("Toa-do-2");
  var ref3 = db.ref("Toa-do-3");
  let currentMarker1 = null, currentMarker2 = null, currentMarker3 = null;
  var x1 = 0, x2 = 0, x3 = 0;
  var y1 = 0, y2 = 0, y3 = 0;
  // Initialize the map with a marker
  let lastMarker1 = null, lastMarker2 = null, lastMarker3 = null;
  var markerTurn = 0;

  map.on('load', function () {
    ref1.on("value", (snapshot) => {
      lastLat1 = parseFloat(snapshot.val().lat);
      lastLng1 = parseFloat(snapshot.val().lng);
      console.log("Toa-do-1: " + lastLat1 + ", " + lastLng1);
      lastMarker1 = L.marker([lastLat1, lastLng1], { icon: redIcon }).addTo(map);
      // console.log("Map loaded");
      createPersistentPopup(lastMarker1, `<div>Lat1=${lastLat1}<br>Lng1=${lastLng1}<br></div>`);
    });
    ref2.on("value", (snapshot) => {
      lastLat2 = parseFloat(snapshot.val().lat);
      lastLng2 = parseFloat(snapshot.val().lng);
      console.log("Toa-do-2: " + lastLat2 + ", " + lastLng2);
      lastMarker2 = L.marker([lastLat2, lastLng2], { icon: greenIcon }).addTo(map);
      createPersistentPopup(lastMarker2, `<div>Lat2=${lastLat2}<br>Lng2=${lastLng2}<br></div>`);
    });
    ref3.on("value", (snapshot) => {
      lastLat3 = parseFloat(snapshot.val().lat);
      lastLng3 = parseFloat(snapshot.val().lng);
      console.log("Toa-do-3: " + lastLat3 + ", " + lastLng3);
      lastMarker3 = L.marker([lastLat3, lastLng3], { icon: blueIcon }).addTo(map);
      createPersistentPopup(lastMarker3, `<div>Lat3=${lastLat3}<br>Lng3=${lastLng3}<br></div>`);
    });

  });

  db.ref("Toa-do-hien-tai").on("value", (snapshot) => {
    const data = snapshot.val();
    const lat_x = data.lat_cur;
    const lng_x = data.lng_cur;
    map.setView([lat_x, lng_x], 20);
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', //Satellite map
    {
      maxZoom: 19
    }).addTo(map);
  
  // Put the Position marker by clicking on the map
  map.on('click', function (e) {
    markerTurn = markerTurn + 1;
    if (markerTurn % 3 == 1) {  // Marker 1 red
      map.removeLayer(lastMarker1)
      const lat1 = e.latlng.lat.toFixed(6);
      const lng1 = e.latlng.lng.toFixed(6);
      x1 = lat1;
      y1 = lng1;
      if ((markerTurn % 3 == 1) && (markerTurn > 3)) {
        map.removeLayer(currentMarker1);
      }
      currentMarker1 = L.marker([lat1, lng1], { icon: redIcon }).addTo(map);
    }

    if (markerTurn % 3 == 2) {  // Marker 2 green
      map.removeLayer(lastMarker2);
      const lat2 = e.latlng.lat.toFixed(6);
      const lng2 = e.latlng.lng.toFixed(6);
      x2 = lat2;
      y2 = lng2;
      if ((markerTurn % 3 == 2) && (markerTurn > 3)) {
        map.removeLayer(currentMarker2);
      }
      currentMarker2 = L.marker([lat2, lng2], { icon: greenIcon }).addTo(map);
    }

    if (markerTurn % 3 == 0) {  // Marker 3 blue
      map.removeLayer(lastMarker3);
      const lat3 = e.latlng.lat.toFixed(6);
      const lng3 = e.latlng.lng.toFixed(6);
      x3 = lat3;
      y3 = lng3;
      if ((markerTurn % 3 == 0) && (markerTurn > 3)) {
        map.removeLayer(currentMarker3);
      }
      currentMarker3 = L.marker([lat3, lng3], { icon: blueIcon }).addTo(map);
    }
  });

  const mapPin = document.getElementById('map-pin');
  const mapDiv = document.getElementById('map');
  const confirmBtn = document.getElementById('confirmBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  // Confirm button to put the position of markers into Firebase
  confirmBtn.addEventListener('click', () => {
    const popup1 = createPersistentPopup(currentMarker1, `<div>Lat1=${x1}<br>Lng1=${y1}<br></div>`);
    const popup2 = createPersistentPopup(currentMarker2, `<div>Lat2=${x2}<br>Lng2=${y2}<br></div>`);
    const popup3 = createPersistentPopup(currentMarker3, `<div>Lat3=${x3}<br>Lng3=${y3}<br></div>`);

    db.ref("Toa-do-1").set({
      lat: parseFloat(x1),
      lng: parseFloat(y1),
    })
    db.ref("Toa-do-2").set({
      lat: parseFloat(x2),
      lng: parseFloat(y2),
    })
    db.ref("Toa-do-3").set({
      lat: parseFloat(x3),
      lng: parseFloat(y3),
    })
  });

  let firebaseMarker = null;
  let prevFirebaseMarker = null;
  const uavIcon = new L.Icon({  // UAV icon
    iconUrl: 'http://getdrawings.com/free-icon/uav-icon-62.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -20],
    shadowSize: [41, 41]
  });

  var prevPos = new L.Icon({  // Previous position marker icon (red dot)
    iconUrl: 'https://vectorified.com/images/red-dot-icon-8.png',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -20],
    shadowSize: [41, 41]
  });

  db.ref("Toa-do-hien-tai").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data && data.lat_cur && data.lng_cur) {
      const lat = data.lat_cur;
      const lng = data.lng_cur;

      if (firebaseMarker) {
        map.removeLayer(firebaseMarker);
        // Add previous position marker
        var prevLat = firebaseMarker.getLatLng().lat;
        var prevLng = firebaseMarker.getLatLng().lng;

        prevFirebaseMarker = L.marker([prevLat, prevLng], { icon: prevPos })
          .addTo(map)
      }
      firebaseMarker = L.marker([lat, lng], { icon: uavIcon })
        .addTo(map)
      // Zoom out the marker size when zooming out
      var lastZoom = 19;
      var markerRatio = 100;

      map.on('zoom', function () {
        var currentZoom = map.getZoom();
        // Set all Marker Ratio
        if (currentZoom >= 15) {    // Maximum zoom out level
          markerRatio = ((100 - (19 - currentZoom) * 10)) / 100;
        }
        else {
          markerRatio = markerRatio;
        }
        // UAV icon
        map.removeLayer(firebaseMarker);
        uavIcon.options.iconSize = [50 * markerRatio, 50 * markerRatio];
        uavIcon.options.iconAnchor = [25 * markerRatio, 25 * markerRatio];
        firebaseMarker = L.marker([lat, lng], { icon: uavIcon })
          .addTo(map)

        // Position marker
        //// Remove marker 1 (red)
        map.removeLayer(lastMarker1);     // previous marker
        if (markerTurn != 0) {
          map.removeLayer(currentMarker1);  // current marker
        }
        redIcon.options.iconSize = [25 * markerRatio, 41 * markerRatio];
        redIcon.options.iconAnchor = [12 * markerRatio, 41 * markerRatio];
        if (markerTurn == 0) {
          lastMarker1 = L.marker([lastLat1, lastLng1], { icon: redIcon }).addTo(map);
        }
        if (markerTurn != 0) {
          currentMarker1 = L.marker([x1, y1], { icon: redIcon }).addTo(map);
        }
        //// Remove marker 2 (green)
        map.removeLayer(lastMarker2);     // previous marker
        if (markerTurn != 0) {
          map.removeLayer(currentMarker2);  // current marker
        }
        greenIcon.options.iconSize = [25 * markerRatio, 41 * markerRatio];
        greenIcon.options.iconAnchor = [12 * markerRatio, 41 * markerRatio];
        if (markerTurn != 0) {
          currentMarker2 = L.marker([x2, y2], { icon: greenIcon }).addTo(map);
        }
        if (markerTurn == 0) {
          lastMarker2 = L.marker([lastLat2, lastLng2], { icon: greenIcon }).addTo(map);
        }
        //// Remove marker 3 (blue)
        map.removeLayer(lastMarker3);     // previous marker
        if (markerTurn != 0) {
          map.removeLayer(currentMarker3);  // current marker
        }
        blueIcon.options.iconSize = [25 * markerRatio, 41 * markerRatio];
        blueIcon.options.iconAnchor = [12 * markerRatio, 41 * markerRatio];
        if (markerTurn == 0) {
          lastMarker3 = L.marker([lastLat3, lastLng3], { icon: blueIcon }).addTo(map);
        }
        if (markerTurn != 0) {
          currentMarker3 = L.marker([x3, y3], { icon: blueIcon }).addTo(map);
        }

        lastZoom = currentZoom;
      });
    }
  });
  // Delete button to remove all markers
  deleteBtn.addEventListener('click', () => {
    markerTurn = 0;
    map.removeLayer(lastMarker1);
    map.removeLayer(lastMarker2);
    map.removeLayer(lastMarker3);
    map.removeLayer(currentMarker1);
    map.removeLayer(currentMarker2);
    map.removeLayer(currentMarker3);
    document.getElementById('status1').innerText = '';
    document.getElementById('status2').innerText = '';
    document.getElementById('status3').innerText = '';
  });
});

