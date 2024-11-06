const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");

// MongoDB 
connectDB();

// Error handler
// app.use(errorHandler);

// Server connection
app.listen(config.SERVER_PORT,()=>console.log(`Server running on http://localhost:${config.SERVER_PORT}`));