// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Aplicatia
const app = express();

app.use(express.static("Materials"));

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/models", (req, res) => {
  const modelsList = readJSONFile();
  const newModel = req.body;
  newModel.id = uuid.v4();
  const newModelList = [...modelsList, newModel];
  writeJSONFile(newModelList);
  res.json(newModel);
});

// Read One
app.get("/models/:id", (req, res) => {
  const modelsList = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundModel;
  modelsList.forEach((model) => {
    if (id == model.id) {
      idFound = true;
      foundModel = model;
    }
  });

  if (idFound) {
    res.json(foundModel);
  } else {
    res.status(404).send(`Model ${id} was not found`);
  }
});

// Read All
app.get("/models", (req, res) => {
  const modelsList = readJSONFile();
  res.json(modelsList);
});

// Update
app.put("/models/:id", (req, res) => {
  const modelsList = readJSONFile();
  const id = req.params.id;
  const newModel = req.body;
  newModel.id = id;
  idFound = false;

  const newModelsList = modelsList.map((model) => {
    if (model.id == id) {
      idFound = true;
      return newModel;
    }
    return model;
  });

  writeJSONFile(newModelsList);

  if (idFound) {
    res.json(newModel);
  } else {
    res.status(404).send(`Model ${id} was not found`);
  }
});

// Delete
app.delete("/models/:id", (req, res) => {
  const modelsList = readJSONFile();
  const id = req.params.id;
  const newModelsList = modelsList.filter((model) => model.id != id);

  if (modelsList.length != newModelsList.length) {
    res.status(200).send(`Model ${id} was removed`);
    writeJSONFile(newModelsList);
  } else {
    res.status(404).send(`Model ${id} was not found`);
  }
});

// Functia de citire din fisierul db.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["models"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ models: content }),
    "utf8",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
