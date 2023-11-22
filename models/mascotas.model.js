const { model, Schema }= require('mongoose');

const mascotaSchema = new Schema({
    nombre: {
        type: String,
        required: true
      },
      especie: {
        type: Schema.Types.ObjectId,
        ref: 'Especie' // Referencia al modelo de Especies
      },
      raza: {
        type: Schema.Types.ObjectId,
        ref: 'Raza' // Referencia al modelo de Razas
      },
      edad: {
        type: Number,
        required: true
      },
      sexo: {
        type: String,
        enum: ['Macho', 'Hembra', 'No especificado'],
        required: true
      },
      descripcion: {
        type: String,
        required: true
      },
      propietario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario' // Referencia al modelo de Usuarios
      },
      imagenes: {
        type: [String]
      },
      fecha_creacion: {
        type: Date,
        default: Date.now
      }

},{collection:'Mascotas'});

module.exports = model('Mascota', mascotaSchema);