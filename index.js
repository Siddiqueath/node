import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';

dotenv.config()
const app = express()
const MONGO_URL = process.env.MONGO_URL

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log('mongo db is connected!! 😎')
  
  return client
}

const client = await createConnection();

app.get('/', function (req, res) {
  res.send('Hello Worldy')
})

app.get('/movies', async (req, res) => {
  const movies = await client.db('zen-db').collection('movies').find({}).toArray()
  res.send(movies)
})

app.get('/movies/:id', async (req, res) => {
  //const movie = movies.find(movie => movie.imdbID === req.params.id)
  const { id } = req.params;

  const movie = await client.db('zen-db').collection('movies').findOne({imdbID: id})
  movie ? res.send(movie) : res.status(400).send({ msg: 'no such movie found'});
})

app.post('/movies', express.json(), async (req, res) => {
  const movies = req.body
  const result = await client.db('zen-db').collection('movies').insertMany(movies)
  res.send(result)
})

app.listen(3000, () => console.log('server is running on port 3000'))