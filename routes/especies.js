const router = require('express').Router();

const Especie = require('../models/especie.model');


//obtener listado
router.get('/', async (req, res)=> {    
    try{
        const especies = await Especie.find();
        console.log(especies);

        res.json(especies);
    }catch(error){
        res.json({error: error.message });

    }
   
});

//obtener por id
router.get('/:id', (req, res)=> {
    
});

module.exports = router;