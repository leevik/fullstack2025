require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const app = express();
const morgan = require("morgan");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.name);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error);
};

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

/* let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
] */

app.get("/api/persons", async (request, response, next) => {
  const persons = await Person.find({});
  response.json(persons);
});

app.get("/info", async (request, response, next) => {
  /* const personsLength = persons.length */
  try {
    const persons = await Person.find({});
    const personsLength = persons.length;
    const date = new Date();
    response.send(
      `Phonebook has info for ${personsLength} people \n
        ${date}
        `
    );
  } catch (err) {
    next(err);
  }
});

app.get("/api/persons/:id", async (request, response, next) => {
  try {
    const person = await Person.findOne({ id: Number(request.params.id) });
    response.json(person);
  } catch (err) {
    next(err)
  }

  /* const id = request.params.id
    const person = persons.find(p => p.id == id)
    if(person){
        response.json(person)
    } else response.status(404).end() 
  */
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    /* const person = await Person.findOne({ id: Number(request.params.id) });
    if(!person){
      return response.status(404).json({error : "Person not found"})
    } */
    console.log("requesti: ", request.params.id)
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post("/api/persons", async (request, response, next) => {
  const body = request.body;
  const persons = await Person.find({});
  const createId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) + 1 : 0;
  const personToAdd = {
    ...body,
    id: createId,
  };
  const check = persons.find((p) => p.name == body.name);
  console.log("checkkaus: ", check)
  if (body.name && check == undefined) {
    const person = new Person(personToAdd);
    const addedPerson = await person.save();
    response.json(addedPerson);
  } 
  else return response.json("Name was not provided or it already exists");
});
app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body)
    
    res.json({
      ...person.toObject(),
      id: person._id
  })
  } catch(err){
    next(err)
  }
})



app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
