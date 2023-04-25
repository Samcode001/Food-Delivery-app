const express = require('express')
const mongoDB = require('./db')
const app = express()
const port = 5000 // Change the port because the react is running in 3000 


// This is the function for CORS Policy when we make connection between frontend & backend then we need it to allow the data to flow
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000","https://sam-foodiee-site.netlify.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();//Middleware function
})
 
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})  

app.use(express.json());
app.use('/api/',require('./Routes/CreateUser')); // in here we genrally frowarding the express to go to the file where the endpoint code is created
app.use('/api/',require('./Routes/DisplayData')); 
app.use('/api/',require('./Routes/OrderData'));// It will direct us to OrderData file

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
})