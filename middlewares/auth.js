const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Middleware de verificación de token en funcionamiento");

  console.log("token: ", token);
  if (!token) {
    return res.status(401).json({ error: "No ha iniciado sesión" });
  }

  try {
    const decoded = jwt.verify(token, "IECA_Cur$0Angu14ar202E");
    req.usuario = decoded;
    console.log("Middleware req.usuario: ", req.usuario);

    next();
  } catch (error) {
    res.status(400).json({ error: "Token no válido" });
  }
};

module.exports = verificarToken;
