import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import * as path from 'path';
/*
*/
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const prisma = new PrismaClient();

app.post("/recipes", async (req, res) => {
  const { name, description, ingredients, category: categoryId } = req.body;
  const imageFile = req.files?.image;

  try {
    let imageUrl = null;
    if (imageFile) {
      const imagePath = path.join('..', '..', 'public', 'uploads', imageFile.name);
      await imageFile.mv(imagePath);
      imageUrl = path.join('/uploads', imageFile.name);
    }

     const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        ingredients,
        imageUrl,
        categoryId: parseInt(categoryId),
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Failed to create recipe:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        category: true,
      },
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Failed to retrieve recipes:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).send("Recipe not found");
    }
  } catch (error) {
    console.error("Failed to retrieve recipe:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/category/id/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
          categoryId: parseInt(categoryId),
      },
      include: {
        category: true,
      },
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Failed to retrieve recipes by category name:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🚀");
});
