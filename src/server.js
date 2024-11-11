const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");


// MongoDB 
connectDB();

// Error handler


// Server connection
app.listen(config.SERVER_PORT,()=>console.log(`Server running on http://localhost:${config.SERVER_PORT}`));