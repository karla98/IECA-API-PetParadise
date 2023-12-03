const { model, Schema } = require('mongoose');

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  },
  mascotas: [{
    type: Schema.Types.ObjectId,
    ref: 'Mascota'
  }]
},{ collection: 'Usuarios' });

module.exports = model('Usuario', usuarioSchema);
