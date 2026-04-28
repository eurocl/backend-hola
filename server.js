import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/hola", (req, res) => {
  res.json({ mensaje: "Hola mundo backend" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo");
});