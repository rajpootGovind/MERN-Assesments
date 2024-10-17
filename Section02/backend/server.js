const express = require("express")
const mongoose= require("mongoose")
const configDB = require("./config/db.config")
const server = require("./config/server.config")



const app = express()

app.use(express.json())

// Create connection with mongoDB
mongoose.connect(configDB.dbUrl)
const db = mongoose.connection

db.on("error", ()=>{
    console.log("error produced")
    console.log(`error while connecting to database${error}`);
})

db.once("open", ()=>{
    console.log("Database connection successfully")
    
})


//add route to the Server

require("./routes/auth.routes")(app) //calling routes and passing obj
require("./routes/user.routes")(app)

// Start the server
app.listen(server.portNumber, ()=>{
    console.log(`server start on port no.${server.portNumber}`)
})
