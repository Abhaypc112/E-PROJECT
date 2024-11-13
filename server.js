const app = require("./src/app");
const config = require("./src/config/config");
const connectDB = require("./src/config/db");

// MongoDB 
connectDB();

// Server connection
app.listen(config.SERVER_PORT,()=>console.log(`Server running on http://localhost:${config.SERVER_PORT}`));