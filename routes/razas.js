const router = require('express').Router();

const Raza = require('../models/raza.model');


//obtener listado
router.get('/', async (req, res)=> {    
    try{
        const razas = await Raza.find();

        res.json(razas);
    }catch(error){
        res.json({error: error.message });

    }
   
});

//obtener por id
router.get('/:id', (req, res)=> {
    
});

module.exports = router;