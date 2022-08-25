const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://127.0.0.1:27017/jwtAuth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
