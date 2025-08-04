require("dotenv").config();
const Note = require("./models/note");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log(url);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error);
};

mongoose.set("strictQuery", false);
mongoose.connect(url);
app.use(express.json());
app.use(express.static("dist"));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", async (request, response) => {
  const testi = await Note.find({});
  console.log(testi);
  response.json(testi);
});

app.get("/api/notes/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }

  /* const id = request.params.id;
  const note = notes.find((note) => note.id == id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  } */
});

app.post("/api/notes/", async (request, response, next) => {
  try {
    const body = request.body;
    if (!body.content) {
      return response.status(400).json({ error: "content missing" });
    }
    const maxId =
      notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
    const note = new Note({
      content: body.content,
      important: body.important || false,
      id: maxId,
    });
    const savedNote = await note.save();
    response.json(savedNote);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/notes/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const note = await Note.findByIdAndDelete(id);
    response.status(204).end();
  } catch (err) {
    next(err);
  }
  /* notes = notes.filter((note) => note.id !== id);
  response.status(204).end(); */
});

app.put("/api/notes/:id", async (request, response, next) => {
  try {
    const { content, important } = request.body;
    const note = await Note.findById(request.params.id);
    if (!note) {
      return response.status(404).end();
    }
    note.content = content;
    note.important = important;
    const updatedNote = await note.save();
    response.json(updatedNote);
  } catch (err) {
    next(err);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
