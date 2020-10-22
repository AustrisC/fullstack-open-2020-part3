require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const Person = require('./person.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// Server logs
morgan.token('request-body', (request) => JSON.stringify(request.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :request-body'
  )
);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.send(`
        <div>
          <p>Phonebook has info for ${persons.length}</p>
          <p>${new Date().toUTCString()}</p>
        </div>
      `);
    })
    .catch((error) => next(error));
});

// Retrieves all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', async (req, res, next) => {
  // No name
  if (!req.body.name) {
    return res
      .status(400)
      .json({ error: 'new person object is missing a name' });
  }

  // No phone number
  if (!req.body.number) {
    return res
      .status(400)
      .json({ error: 'new person object is missing a phone number' });
  }

  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  // Saves the new person
  return newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON());
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', async (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ errorMessage: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ errorMessage: 'ID is malformed' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ errorMessage: error.message });
  }

  return next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
