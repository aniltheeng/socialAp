const app = require("./app");
const PORT = process.env.PORT
const databaseConnect = require('./config/database')
const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });


databaseConnect ()

app.listen(process.env.PORT,()=>{
    console.log(`server is working on port:http://localhost:${PORT}`)
})