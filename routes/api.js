const router = require('express').Router();

router.use('/mascotas', require('./mascotas'));
router.use('/especies', require('./especies'));
router.use('/razas', require('./razas'));
router.use('/usuarios', require('./usuarios'));
router.use('/perfil', require('./perfil'));
router.use('/eventos', require('./eventos'));


module.exports=router;