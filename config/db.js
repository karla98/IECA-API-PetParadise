const mongoose = require('mongoose');

const connectionParams = /*{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}*/
{ useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.ATLAS_URI).then(()=>{
    console.log('Se conectó a la BD');
}).catch((err)=>{
    console.log('Error al conectar a la BD',err);
});