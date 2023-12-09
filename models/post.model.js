const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario' // Referencia al modelo de Usuarios
    },
    imagen: {
        type: String
    },
}, { collection: 'Posts' });

module.exports = model('post', postSchema);