const { model, Schema } = require('mongoose');

const eventoSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  ubicacion: {
    type: String
  },
  creador: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  participantes: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
},{ collection: 'Eventos' });

module.exports = model('Evento', eventoSchema);
