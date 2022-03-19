const mongoose = require('mongoose')

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true, useUnifiedTopology: true, 
    })
    .then((con)=>console.log(`database connected to ${con.connection.host}`))
}

module.exports = connectDatabase