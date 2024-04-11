// common JS
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/users');

const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userRouter);

app.use((err, req, res, next) => {
  console.log('Oops, something went wrong', err);
  res.status(500).send('Internal server error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

main()
  .then(() => console.log('MongoDB running'))
  .catch((err) => console.log(err));
