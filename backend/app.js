const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const errorMiddleware = require("./middleWare/error");

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(
    {
       origin:["http://localhost:5173/", "https://mern-ims-app.onrender.com"] ,
    }
));



//ROUTE EXPORTS
const product = require("./route/productRoute");
const user = require("./route/userRoute");
const company = require("./route/companyRoutes");

app.use("/rac", product);
app.use("/rac", user);
app.use('/rac', company);


// Middleware for Errors
app.use(errorMiddleware);

module.exports =app;