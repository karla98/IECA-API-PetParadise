const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

//Register
router.post('/register', async (req, res)=> {
  try{

    req.body.password = bcrypt.hashSync(req.body.password, 10);
      const usuario = await Usuario.create(req.body);
      res.json(usuario);
  }catch(error){
      res.json({error: error.message });

  }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });

    if (!usuario) {
      return res.status(404).json({ error: 'Cuenta inexistente' });
    }

    if (usuario.password && bcrypt.compareSync(req.body.password, usuario.password)) {
      res.json({
        success: 'Login exitoso',
        token: generateTokenAuth(usuario),
      });
    } else {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});


function generateTokenAuth(usuario){
  const payload = {
    usuario_id: usuario._id
  };

  const secretKey = "IECA_Cur$0Angu14ar202E";


  return jwt.sign(payload,secretKey);

}

module.exports = router;