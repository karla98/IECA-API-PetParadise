const router = require('express').Router();

const Mascota = require('../models/mascotas.model');
const Raza = require('../models/raza.model');


//obtener listado
router.get('/', async (req, res)=> {    
    try{
        const mascotas = await Mascota.find().populate('especie').populate('raza').exec();

        res.json(mascotas);
    }catch(error){
        res.json({error: error.message });

    }
   
});

//obtener por id
router.get('/:id', async (req, res)=> {
    const { id } = req.params;
    try{
        const mascota = await Mascota.findById(id).populate('especie').populate('raza').exec();

        res.json(mascota);
    }catch(error){
        res.json({error: error.message });

    }
});

//creación 
router.post('/', async (req, res)=> {    
    try{
        const mascota = await Mascota.create(req.body);

        res.json(mascota);
    }catch(error){
        res.json({error: error.message });

    } 
});


//Editar
router.patch('/:id', async (req, res)=> {  
    const { id } = req.params;
  
    try{
        const mascota = await Mascota.findByIdAndUpdate(id, req.body, {new: true});

        res.json(mascota);
    }catch(error){
        res.json({error: error.message });

    } 
});

//Eliminar
router.delete('/:id', async (req, res)=> {  
    const { id } = req.params;
  
    try{
        const mascota = await Mascota.findByIdAndDelete(id);

        res.json(mascota);
    }catch(error){
        res.json({error: error.message });

    } 
});

module.exports = router;