const router = require("express").Router();

const Post = require("../models/post.model");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const streamifier = require("streamifier");

const authMiddleware = require("../middlewares/auth");



router.get('/:id', async (req, res) => {
    const userid = req.params.id;

    try {
        const post = await Post.find({ usuario: userid }).populate('usuario');
        res.json(post);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.post("/", authMiddleware, upload.single("imagen"), async (req, res) => {
    try {
        const userId = req.usuario.usuario_id;

        const imagen = req.file;
        if (!imagen) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
        }

        const imagenUrl = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream((error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            });

            streamifier.createReadStream(imagen.buffer).pipe(stream);
        });

        const nuevoPost = await Post.create({
            descripcion: req.body.descripcion,
            usuario: userId,
            imagen: imagenUrl,
        });

        // Puedes retornar el nuevo post si es necesario
        return res.json(nuevoPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;