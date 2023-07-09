const express = require('express')
const mongoDB = require('./database')
const app = express()
const port = 5000

mongoDB();

// This is the function for CORS Policy when we make connection between frontend & backend then we need it to allow the data to flow
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();//Middleware function
  })

app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));
app.use('/api',require('./Routes/payment'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})