const router = require("express").Router();

const Usuario = require("../models/usuarios.model");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const streamifier = require("streamifier");

const authMiddleware = require("../middlewares/auth");

//Subir imagen de perfil
router.post("/", authMiddleware, upload.single("imagen"),  async (req, res) => {
    try {
      console.log("req.files: ", req.file);

      const usuarioId = req.usuario.usuario_id;

      const imagen = req.file;

      if (!imagen) {
        return res.status(400).json({ error: "Por favor, envía una imagen" });
      }

      const imagenUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
  
        streamifier.createReadStream(imagen.buffer).pipe(stream);
      });

      const usuario = await Usuario.findByIdAndUpdate(
        usuarioId,
        { imagen: imagenUrl },
        {
          new: true,
        }
      );

      res.json(usuario);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);


//obtener imagen de perfil
router.get("/", authMiddleware, async (req, res) => {
  try {

    const usuarioId = req.usuario.usuario_id;
    
    const usuario = await Usuario.findById(
      usuarioId,
    );

    res.json(usuario);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
