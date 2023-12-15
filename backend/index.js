const express = require('express')
const mongoDB = require('./database')
const app = express()
const port = 5000
const  userRoutes=require("./Routes/CreateUser")
const dataRoutes=require('./Routes/DisplayData')
const orderDataRoutes=require('./Routes/OrderData')
const paymentRoutes=require('./Routes/payment')
const mongoose = require('mongoose');
require('dotenv').config();
const mongoString=process.env.mongoString;
const cors=require('cors')

// mongoDB();

// This is the function for CORS Policy when we make connection between frontend & backend then we need it to allow the data to flow
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin,X-Requested-With,Content-Type,Accept"
//     );
//     next();//Middleware function
//   })

app.use(cors());
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',dataRoutes);
app.use('/api',orderDataRoutes);
app.use('/api',paymentRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect(`mongodb://localhost:27017/foodiee`, { useNewUrlParser: true },{ useUnifiedTopology: true }).then(()=>{
  console.log("Database Connected");
}).catch(error=>console.log(`Error in MongoDb: ${error}`));


