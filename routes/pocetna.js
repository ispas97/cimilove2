const express = require("express");
const router = express.Router();




var arrayGradova = ["Beograd", "Kragujevac", "Nis", "Novi Sad"];
var arrayGradovaLatLng = [{lat:44.80401,lng:20.46513}, {lat:44.01667,lng:20.91667},
    {lat:43.32472,lng:21.90333}, {lat:45.25167,lng:19.83694}];

var arrayMarkeriCoordinate = [{lat:44.80401,lng:20.465135},
{lat:44.78401,lng:20.485135},{lat:44.76401,lng:20.50513},{lat:44.78401,lng:20.42513}];


router.get("/", (req, res) => {
    console.log("Ide na get metodu");
    const gradovi = [
                            {
                                naziv: "Beograd",
                                koordinate: {lat:44.80401,lng:20.46513}
                            },
                            {
                                naziv: "Kragujevac",
                                koordinate: {lat:44.01667,lng:20.91667}
                            },
                            {
                                naziv: "Nis",
                                koordinate: {lat:43.32472,lng:21.90333}
                            },
                            {
                                naziv: "Novi Sad",
                                koordinate: {lat:45.25167,lng:19.83694}
                            }]

    const stringGradovi = JSON.stringify(gradovi);
    const markeriCoordinate = JSON.stringify(arrayMarkeriCoordinate);
    
    res.render("pocetna/pocetnaIzgled", {gradovi: stringGradovi,
                                        markeri: markeriCoordinate});
})

module.exports = router;