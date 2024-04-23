// common JS
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/users');
const authMiddleware = require('./middlewares/auth');
const { login, saveUser } = require('./controllers/user');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());

app.post('/api/login', login);
app.post('/api/signup', saveUser);

app.use(authMiddleware);
app.use('/api', userRouter);

app.use((err, req, res, next) => {
  console.log('Oops, something went wrong', err);
  res.status(500).send('Internal server error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION);
}

main()
  .then(() => console.log('MongoDB running'))
  .catch((err) => console.log(err));
