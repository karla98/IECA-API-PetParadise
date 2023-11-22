const router = require('express').Router();

const Usuario = require('../models/usuarios.model');
const Raza = require('../models/raza.model');


//obtener listado
router.get('/', async (req, res)=> {    
    try{
        //const usuarios = await Usuario.find().populate('mascotas').exec();

        const usuarios = await Usuario.find().populate({
            path: 'mascotas',
            populate: {
              path: 'especie',
            },
          }).populate({
            path: 'mascotas',
            populate: {
              path: 'raza',
            },
          }).exec();
          

        res.json(usuarios);
    }catch(error){
        res.json({error: error.message });

    }
   
});

//obtener por id
router.get('/:id', async (req, res)=> {
    const { id } = req.params;
    try{
        //const usuario = await Usuario.findById(id);

        const usuario = await Usuario.findById(id).populate({
            path: 'mascotas',
            populate: {
              path: 'especie',
            },
          }).populate({
            path: 'mascotas',
            populate: {
              path: 'raza',
            },
          }).exec();

        res.json(usuario);
    }catch(error){
        res.json({error: error.message });

    }
});

module.exports = router;