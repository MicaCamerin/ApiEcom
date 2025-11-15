const express = require("express");
const router = express.Router();
const userService = require("../data/user.mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await userService.getByEmail(email);
    if (exists) {
      return res.status(400).json({ message: "Ya existe un usuario con ese email" });
    }

    const newUser = await userService.create({
      first_name,
      last_name,
      email,
      age,
      password,
    });

    return res.json({ message: "Usuario registrado", user: newUser });
  } catch (error) {
    console.error("❌ Error en register:", error);
    return res.status(500).json({ message: "Error en el registro", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("authToken", token, { httpOnly: true });

    return res.json({ message: "Login exitoso" });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ message: "Error en login", error: error.message });
  }
});

router.get("/current", (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "No estás autenticado" });
    }

    const userData = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({ user: userData });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido", error: error.message });
  }
});

module.exports = router;