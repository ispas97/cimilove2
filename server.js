
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const path = require("path");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverrire = require("method-override");

const pocetnaRouter = require("./routes/pocetna");
//const korisnikRouter = require("./routes/korisnici");
const oglasRouter = require("./routes/oglasi");
const userRouter = require("./routes/korisnici");

app.set("view engine", "ejs"); //Podesavamo view engine
app.set("views", path.join(__dirname, 'views'));  //Podesavamo gde ce se nalaziti views
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverrire("_method")); //Ovaj parametar je kao name input ili tako nesto... nzn
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit: "20mb", extended: false}));

const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=> console.log("NIJE SE KONEKTOVALO!!!"))
db.once('open', () => console.log('Connected to mongoose'))


app.use("/", pocetnaRouter);
//app.use("/korisnik", korisnikRouter);
app.use("/oglasi", oglasRouter);
app.use("/korisnici",userRouter);


app.listen(process.env.PORT || 3000);