const { model, Schema } = require('mongoose');

const especieSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  }
},{ collection: 'Especies' });

module.exports = model('Especie', especieSchema);
