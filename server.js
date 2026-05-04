import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// 🔌 CONEXIÓN A MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongo conectado"))
  .catch(err => console.log("❌ Error Mongo:", err));

// 📦 MODELO
const storySchema = new mongoose.Schema({
  title: String,
});

const Story = mongoose.model("Story", storySchema);

// 🔹 GET lista
app.get("/stories", async (req, res) => {
  const stories = await Story.find();
  res.json(stories);
});

// 🔹 GET por ID
app.get("/stories/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: "No encontrado" });
    }

    res.json(story);
  } catch {
    res.status(404).json({ error: "ID inválido" });
  }
});

// 🔹 POST crear
app.post("/stories", async (req, res) => {
  const nueva = new Story({
    title: req.body.title || "Sin título",
  });

  await nueva.save();
  res.status(201).json(nueva);
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});