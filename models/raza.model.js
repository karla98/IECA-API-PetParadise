const { model, Schema } = require('mongoose');

const razaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  }
},{ collection: 'Razas' });

module.exports = model('Raza', razaSchema);
