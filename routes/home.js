const router = require("express").Router();
const Mascota = require("../models/mascotas.model");

//obtener las 5 mascotas creadas más recientes
router.get("/", async (req, res) => {
  try {
    const mascotas = await Mascota.find()
      .populate("especie")
      .populate("raza")
      .populate({
        path: "propietario",
        model: "Usuario",
        select: "nombre  imagen"
      })
      .sort({ fecha_creacion: -1 })
      .limit(5)
      .exec();

    res.json(mascotas);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
