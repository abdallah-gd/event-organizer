const connectDb = require("./config/dbcnx");
const express = require("express");
const userRouters = require("./routes/userRoutes");
const eventRoutes = require('./routes/eventRoutes');
require("dotenv").config();
const app = express();
connectDb();
app.use(express.json());

app.use("/users",userRouters);
app.use('/events', eventRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);  
})