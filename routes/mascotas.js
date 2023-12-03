const router = require("express").Router();

const Mascota = require("../models/mascotas.model");
const Raza = require("../models/raza.model");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const streamifier = require('streamifier'); 

const authMiddleware = require('../middlewares/auth');

// router.use(express.json());
//obtener listado
router.get("/", async (req, res) => {
  try {
    const mascotas = await Mascota.find()
      .populate("especie")
      .populate("raza")
      .exec();

    res.json(mascotas);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//obtener por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mascota = await Mascota.findById(id)
      .populate("especie")
      .populate("raza")
      .exec();

    res.json(mascota);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//creación
router.post("/", authMiddleware,upload.array('imagenes', 3), async (req, res) => {

  try {

    console.log('req.files: ', req.files);

    const usuarioId = req.usuario.usuario_id;

    const imagenes = req.files;

    const imagenesUrls = await Promise.all(
        imagenes.map(async (imagen) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
  
            streamifier.createReadStream(imagen.buffer).pipe(stream);
          });
        })
      );

    const mascota = await Mascota.create({
        ...req.body,
        propietario: usuarioId,
        imagenes: imagenesUrls,
      });

    res.json(mascota);
    
  } catch (error) {
    res.json({ error: error.message });
  }
});

//Editar
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const mascota = await Mascota.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(mascota);
  } catch (error) {
    res.json({ error: error.message });
  }
});

//Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const mascota = await Mascota.findByIdAndDelete(id);

    res.json(mascota);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
