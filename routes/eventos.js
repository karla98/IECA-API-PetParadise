const router = require('express').Router();

require('../models/usuarios.model');
const Evento = require('../models/eventos.model');


//obtener listado
router.get('/', async (req, res)=> {    
    try{
        const eventos = await Evento.find().populate('participantes').exec();

        res.json(eventos);
    }catch(error){
        res.json({error: error.message });

    }
   
});

//obtener por id
router.get('/:id', async (req, res)=> {
    const { id } = req.params;
    try{
        const evento = await Evento.findById(id).populate('participantes').exec();

        res.json(evento);
    }catch(error){
        res.json({error: error.message });

    }
});

module.exports = router;