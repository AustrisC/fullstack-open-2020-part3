const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    let person = null;
    if (req.params !== null && req.params.hasOwnProperty('id')) {
      const id = Number(req.params.id);
      person = persons.find((p) => p.id === id);
    }

    const result = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ];

    if (person !== null) {
      result.push(JSON.stringify(person));
    }

    return result.join(' ');
  })
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  res.send(`
    <div>
      <p>Phonebook has info for ${persons.length}</p>
      <p>${new Date().toUTCString()}</p>
    </div>
  `);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const existingNames = persons.map((p) => p.name.toLowerCase());
  const newPerson = request.body;
  // Random int from 10 million values
  newPerson.id = getRandomInt(10000000);

  // No name
  if (!newPerson.hasOwnProperty('name')) {
    return response
      .status(400)
      .send({ error: 'new person object is missing a name' });
  }

  // No phone number
  if (!newPerson.hasOwnProperty('number')) {
    return response
      .status(400)
      .send({ error: 'new person object is missing a phone number' });
  }

  // Name already exists
  if (existingNames.includes(newPerson.name.toLowerCase())) {
    return response.status(400).send({ error: 'name must be unique' });
  }

  console.log(newPerson);
  return response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
