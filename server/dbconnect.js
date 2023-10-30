const mongoose=require("mongoose");

module.exports= async()=>{
    const mongoUri=
    "mongodb+srv://kartik:QDnsULBu3G0RIU1q@cluster0.euktqhn.mongodb.net/?retryWrites=true&w=majority";
    
    try {
        const connect= await mongoose.connect(mongoUri,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log(`mongo conneted ${connect.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};