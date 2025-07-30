const express = require("express");
const app = express();
const morgan = require("morgan")
const cors = require('cors')




const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})


app.use(cors())
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))
/* app.use(requestLogger) */

let persons = [
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
]


app.get("/api/persons", (request, response) => {
  response.json(persons)
});

app.get("/info", (request, response) => {

    const personsLength = persons.length
    const date = new Date()
    response.send(
        `Phonebook has info for ${personsLength} people \n
        ${date}
        `)
});

app.get("/api/person/:id", (request,response) => {
    const id = request.params.id
    const person = persons.find(p => p.id == id)
    if(person){
        response.json(person)
    } else response.status(404).end()
    
})

app.delete("/api/person/:id", (request, response) => {

    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end();
    
});



app.post("/api/person", (request, response) => {
    const body = request.body

    const createId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) +1 : 0
    person = {
        ...body,
        id: createId
    }
    const check = persons.find(p => p.name == body.name)
    console.log("checkki: " + check)
    if(body.name && check == undefined){
        persons = persons.concat(person)
        /* console.log(person) */
    } else return response.json("Name was not provided or it already exists")
    response.json(body)
})

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


