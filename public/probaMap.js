var mapa;

var radius = 2500;

var brojOglasaUPolju = 0;

var buttonPrikaziOblast = document.createElement("button");
buttonPrikaziOblast.className = "buttonPrikaziOglase";
buttonPrikaziOblast.innerHTML = "Prikazi oglase u ovoj oblasti (" + brojOglasaUPolju + ")";
buttonPrikaziOblast.id = "dugmePrikaziOblast";


var sliderDiv = document.createElement("div"); //div za slajder
var buttonPrikaziOblastDiv = document.createElement("div"); //div za dugme za prikaz odredjenih oglasa


function myMap(){
    console.log("Radi li mapa?");
    //Kreiranje objekta za opcije koje ce biti prosledjene mapi :)
    var options = {
        zoom: 10,
        center: centerPosition
        //mapTypeId: "terrain"
    }

    //Kreiranje mape
    mapa = new google.maps.Map(document.getElementById("Map"), options);

    google.maps.event.addListener(mapa, 'click', function(event) {
        console.log("Koordinate su: " + event.latLng);
        let myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        centarKrugaKoordinate = myLatLng;
        klikNaMapu(centarKrugaKoordinate);

        //addMarker(event.latLng); Ovo apsolutno radi
    });

    dodajSveMarkereArray();
}

//Sta radimo kada kliknemo na mapu
function klikNaMapu(coordsObjekat){
    if(cityCircle == null){ //Ako nema kruga, pravimo ga
        slider.value = "4000";
        radius = 4000;
        krug(coordsObjekat);
        PrikaziMarkereUnutarRadiusa();
    }
    else{ //Ako ima kruga, brisemo ga
        cityCircle.setMap(null);
        cityCircle = null;
        arrayMarkeri.forEach(marker => {
            marker.setMap(null);
        });
    }

    if(cityCircle != null){ //Ako ima kruga na mapi, crtamo slajder
        var MapaSliderDiv = document.getElementById("MapaSliderDiv");

        sliderDiv.id = "Slider";
        sliderDiv.appendChild(slider);
        MapaSliderDiv.appendChild(sliderDiv)

        buttonPrikaziOblastDiv.appendChild(buttonPrikaziOblast);
        MapaSliderDiv.appendChild(buttonPrikaziOblastDiv);

        window.scroll(0,findPos(dugmePrikaziOblast)); //scrooluj do ovog elementa
        
    }
    else{ //Ako nema kruga, brisemo ga
        var nav = document.getElementById("nav");
        window.scroll(0,findPos(nav));
        window.setTimeout(() =>{
            sliderDiv.remove();
            buttonPrikaziOblastDiv.remove();
        }, 300)
        
    }
}

//Deo vezan za pravljenje kruga
var cityCircle;
var centarKrugaKoordinate;

function krug(coordsObjekat){
        cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: mapa,
        center: coordsObjekat,
        radius: radius
    });
}


//Deo za pravljenje markera
var marker;

function dodajSveMarkereArray(){
    arrayMarkeriCoordinate.forEach(element => {
        addMarker(element);
    });
}

function addMarker(coords){
        marker = new google.maps.Marker({
        position: coords,
        map: null,
        clickable: false //hover afect none
    });
    arrayMarkeri.push(marker);
}

var arrayMarkeri = [];
var arrayMarkeriCoordinate = [{lat:44.80401,lng:20.465135},
    {lat:44.78401,lng:20.485135},{lat:44.76401,lng:20.50513},{lat:44.78401,lng:20.42513}];
var arrayGradova = ["Beograd", "Kragujevac", "Nis", "Novi Sad"];
var arrayGradovaLatLng = [{lat:44.80401,lng:20.46513}, {lat:44.01667,lng:20.91667},
    {lat:43.32472,lng:21.90333}, {lat:45.25167,lng:19.83694}];

function izabraoZeljeniGrad(selectedIndexOfInput){
    console.log(arrayGradova[selectedIndexOfInput]);
    mapaPositionRefresh(arrayGradovaLatLng[selectedIndexOfInput]); 
}


//Deo za options u select
var input = document.getElementById("input");
input.addEventListener("change", (event) => izabraoZeljeniGrad(event.target.selectedIndex));
for(let x=0;x<arrayGradova.length;x++){
    var opcije = document.createElement("option");
    opcije.text = arrayGradova[x];
    opcije.name = arrayGradova[x]; //Nekako ne mogu da mu pristupim
    input.add(opcije);
}


//Pravljenje slajdera
var slider = document.createElement("input");
    slider.type = "range";
    slider.min = "1";
    slider.max = "8000";
    slider.value = "4000";
    slider.className = "slider";

slider.oninput = function(){ //Promena vrednosti slajdera
    cityCircle.setMap(null); //brisemo stari krug
    radius = parseInt(this.value);
    krug(centarKrugaKoordinate);
    PrikaziMarkereUnutarRadiusa();
}


//Za prikazivanje i sklanjanje markera sa mape
function PrikaziMarkereUnutarRadiusa(){
    brojOglasaUPolju = 0;
    arrayMarkeri.forEach(marker => {
        let daljina = daljinaIzmedju2Tacke(marker.position);
        if(radius > daljina){
            brojOglasaUPolju++;
            marker.setMap(mapa);
        }
        else marker.setMap(null);
        buttonPrikaziOblast.innerHTML = "Prikazi oglase u ovoj oblasti (" + brojOglasaUPolju + ")";
    });
}

function daljinaIzmedju2Tacke(markerKoordinate){

    var distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
        centarKrugaKoordinate,
        markerKoordinate
    );
    return distanceInMeters;
}


//Funkcija za smooth scrool
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}


//Funkcija za refresovanje mesta koje mapa prikazuje -> trigeruje promena inputa
function mapaPositionRefresh(koordinate){
    centerPosition = koordinate;
    myMap();
}

var centerPosition = { //Beograd coords
    lat:44.80401,
    lng:20.46513
}