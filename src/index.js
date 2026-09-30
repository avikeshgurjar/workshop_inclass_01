const express = require('express')
const routes= require("./routes/routes")



const server = express()

server.use('/products',routes)



const port = '3000';
server.listen(port, (err) => {
  if (err) {
    console.log(err.message)
  
  }
  console.log("Server is running successfully.....")
  
})